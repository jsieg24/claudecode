import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';
import { AnalyticsService, MetricsData, CohortData, TimeSeriesData } from './AnalyticsService';
import fs from 'fs';
import path from 'path';

export class ExportService {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  async exportMetricsToCSV(filePath: string): Promise<void> {
    const metrics = await this.analyticsService.getMetrics();
    const mrrTimeSeries = await this.analyticsService.getMRRTimeSeries();
    const revenueByPlatform = await this.analyticsService.getRevenueByPlatform();

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'metric', title: 'Metric' },
        { id: 'value', title: 'Value' },
      ],
    });

    const records = [
      { metric: 'MRR', value: `$${metrics.mrr.toFixed(2)}` },
      { metric: 'ARR', value: `$${metrics.arr.toFixed(2)}` },
      { metric: 'Active Subscriptions', value: metrics.activeSubscriptions },
      { metric: 'Churn Rate', value: `${metrics.churnRate.toFixed(2)}%` },
      { metric: 'Customer LTV', value: `$${metrics.ltv.toFixed(2)}` },
    ];

    await csvWriter.writeRecords(records);
    console.log(`✅ Metrics exported to ${filePath}`);
  }

  async exportMRRTimeSeriesToCSV(filePath: string, months: number = 12): Promise<void> {
    const data = await this.analyticsService.getMRRTimeSeries(months);

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'date', title: 'Month' },
        { id: 'value', title: 'MRR' },
      ],
    });

    await csvWriter.writeRecords(data);
    console.log(`✅ MRR time series exported to ${filePath}`);
  }

  async exportCohortAnalysisToCSV(filePath: string): Promise<void> {
    const data = await this.analyticsService.getCohortAnalysis();

    const headers = [
      { id: 'cohort', title: 'Cohort' },
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `month${i}`,
        title: `Month ${i}`,
      })),
    ];

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers,
    });

    await csvWriter.writeRecords(data);
    console.log(`✅ Cohort analysis exported to ${filePath}`);
  }

  async exportMetricsToPDF(): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const metrics = await this.analyticsService.getMetrics();
        const mrrTimeSeries = await this.analyticsService.getMRRTimeSeries();
        const topCustomers = await this.analyticsService.getTopCustomers();

        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Title
        doc.fontSize(20).text('Subscription Analytics Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(2);

        // Key Metrics
        doc.fontSize(16).text('Key Metrics', { underline: true });
        doc.moveDown();
        doc.fontSize(12);
        doc.text(`Monthly Recurring Revenue (MRR): $${metrics.mrr.toFixed(2)}`);
        doc.text(`Annual Recurring Revenue (ARR): $${metrics.arr.toFixed(2)}`);
        doc.text(`Active Subscriptions: ${metrics.activeSubscriptions}`);
        doc.text(`Churn Rate: ${metrics.churnRate.toFixed(2)}%`);
        doc.text(`Customer Lifetime Value (LTV): $${metrics.ltv.toFixed(2)}`);
        doc.moveDown(2);

        // MRR Trend
        doc.fontSize(16).text('MRR Trend (Last 12 Months)', { underline: true });
        doc.moveDown();
        doc.fontSize(10);

        mrrTimeSeries.forEach(item => {
          doc.text(`${item.date}: $${item.value.toFixed(2)}`);
        });

        doc.moveDown(2);

        // Top Customers
        doc.fontSize(16).text('Top 10 Customers by Revenue', { underline: true });
        doc.moveDown();
        doc.fontSize(10);

        topCustomers.forEach((customer: any, index: number) => {
          const custData = customer.get({ plain: true });
          const name = custData.customer
            ? `${custData.customer.first_name} ${custData.customer.last_name}`
            : 'Unknown';
          doc.text(`${index + 1}. ${name} - $${parseFloat(custData.total_spent).toFixed(2)}`);
        });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}
