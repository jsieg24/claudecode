import { Op, fn, col, literal } from 'sequelize';
import { Subscription, Order, Customer } from '../models';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

export interface MetricsData {
  mrr: number;
  arr: number;
  activeSubscriptions: number;
  churnRate: number;
  ltv: number;
}

export interface CohortData {
  cohort: string;
  month0: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
  month6: number;
  month7: number;
  month8: number;
  month9: number;
  month10: number;
  month11: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export class AnalyticsService {
  async getMetrics(startDate?: Date, endDate?: Date): Promise<MetricsData> {
    const dateFilter = this.buildDateFilter(startDate, endDate);

    // Calculate MRR
    const activeSubscriptions = await Subscription.findAll({
      where: {
        status: 'active',
        ...dateFilter,
      },
    });

    const mrr = activeSubscriptions.reduce((sum, sub) => sum + parseFloat(sub.mrr.toString()), 0);
    const arr = mrr * 12;

    // Calculate churn rate
    const churnRate = await this.calculateChurnRate(startDate, endDate);

    // Calculate LTV
    const ltv = await this.calculateLTV();

    return {
      mrr,
      arr,
      activeSubscriptions: activeSubscriptions.length,
      churnRate,
      ltv,
    };
  }

  async getMRRTimeSeries(months: number = 12): Promise<TimeSeriesData[]> {
    const data: TimeSeriesData[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      const subscriptions = await Subscription.findAll({
        where: {
          status: 'active',
          created_at: { [Op.lte]: endDate },
          [Op.or]: [
            { cancelled_at: null },
            { cancelled_at: { [Op.gt]: endDate } },
          ],
        },
      });

      const mrr = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.mrr.toString()), 0);

      data.push({
        date: format(startDate, 'yyyy-MM'),
        value: mrr,
      });
    }

    return data;
  }

  async getARRTimeSeries(months: number = 12): Promise<TimeSeriesData[]> {
    const mrrData = await this.getMRRTimeSeries(months);
    return mrrData.map(item => ({
      date: item.date,
      value: item.value * 12,
    }));
  }

  async getChurnTimeSeries(months: number = 12): Promise<TimeSeriesData[]> {
    const data: TimeSeriesData[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      const churnRate = await this.calculateChurnRate(startDate, endDate);

      data.push({
        date: format(startDate, 'yyyy-MM'),
        value: churnRate,
      });
    }

    return data;
  }

  async getCohortAnalysis(): Promise<CohortData[]> {
    const cohorts: CohortData[] = [];
    const monthsToAnalyze = 12;

    for (let i = monthsToAnalyze - 1; i >= 0; i--) {
      const cohortDate = subMonths(new Date(), i);
      const cohortStart = startOfMonth(cohortDate);
      const cohortEnd = endOfMonth(cohortDate);

      // Get customers who subscribed in this cohort month
      const cohortSubscriptions = await Subscription.findAll({
        where: {
          created_at: {
            [Op.between]: [cohortStart, cohortEnd],
          },
        },
      });

      const cohortData: any = {
        cohort: format(cohortStart, 'yyyy-MM'),
      };

      const initialCount = cohortSubscriptions.length;

      // Calculate retention for each subsequent month
      for (let month = 0; month < 12; month++) {
        const checkDate = endOfMonth(subMonths(new Date(), i - month));

        const retained = cohortSubscriptions.filter(sub => {
          const stillActive = !sub.cancelled_at || new Date(sub.cancelled_at) > checkDate;
          return stillActive;
        }).length;

        const retentionRate = initialCount > 0 ? (retained / initialCount) * 100 : 0;
        cohortData[`month${month}`] = retentionRate;
      }

      cohorts.push(cohortData);
    }

    return cohorts;
  }

  async getRevenueByPlatform(startDate?: Date, endDate?: Date): Promise<any[]> {
    const dateFilter = this.buildDateFilter(startDate, endDate);

    const result = await Order.findAll({
      attributes: [
        'source_platform',
        [fn('SUM', col('total_price')), 'total_revenue'],
        [fn('COUNT', col('id')), 'order_count'],
      ],
      where: dateFilter,
      group: ['source_platform'],
      raw: true,
    });

    return result;
  }

  async getTopCustomers(limit: number = 10): Promise<any[]> {
    const result = await Order.findAll({
      attributes: [
        'customer_id',
        [fn('SUM', col('total_price')), 'total_spent'],
        [fn('COUNT', col('id')), 'order_count'],
      ],
      group: ['customer_id'],
      order: [[literal('total_spent'), 'DESC']],
      limit,
      include: [{
        model: Customer,
        as: 'customer',
        attributes: ['first_name', 'last_name', 'email'],
      }],
    });

    return result;
  }

  private async calculateChurnRate(startDate?: Date, endDate?: Date): Promise<number> {
    const start = startDate || startOfMonth(subMonths(new Date(), 1));
    const end = endDate || endOfMonth(subMonths(new Date(), 1));

    const activeAtStart = await Subscription.count({
      where: {
        created_at: { [Op.lte]: start },
        [Op.or]: [
          { cancelled_at: null },
          { cancelled_at: { [Op.gt]: start } },
        ],
      },
    });

    const churnedInPeriod = await Subscription.count({
      where: {
        cancelled_at: {
          [Op.between]: [start, end],
        },
      },
    });

    return activeAtStart > 0 ? (churnedInPeriod / activeAtStart) * 100 : 0;
  }

  private async calculateLTV(): Promise<number> {
    // Simple LTV calculation: Average Order Value * Average Customer Lifespan
    const avgOrderValue = await Order.findOne({
      attributes: [[fn('AVG', col('total_price')), 'avg_value']],
      raw: true,
    }) as any;

    // Calculate average customer lifespan in months
    const customers = await Customer.findAll({
      include: [{
        model: Subscription,
        as: 'subscriptions',
      }],
    });

    let totalLifespan = 0;
    let customerCount = 0;

    for (const customer of customers) {
      const subscriptions = customer.get('subscriptions') as Subscription[];
      if (subscriptions && subscriptions.length > 0) {
        for (const sub of subscriptions) {
          const startDate = new Date(sub.created_at);
          const endDate = sub.cancelled_at ? new Date(sub.cancelled_at) : new Date();
          const lifespan = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
          totalLifespan += lifespan;
          customerCount++;
        }
      }
    }

    const avgLifespan = customerCount > 0 ? totalLifespan / customerCount : 12; // Default to 12 months

    const avgValue = parseFloat(avgOrderValue?.avg_value || '0');

    return avgValue * avgLifespan;
  }

  private buildDateFilter(startDate?: Date, endDate?: Date): any {
    if (!startDate && !endDate) return {};

    const filter: any = {};

    if (startDate && endDate) {
      filter.created_at = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      filter.created_at = { [Op.gte]: startDate };
    } else if (endDate) {
      filter.created_at = { [Op.lte]: endDate };
    }

    return filter;
  }
}
