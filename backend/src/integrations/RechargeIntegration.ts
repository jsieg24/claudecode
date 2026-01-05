import axios from 'axios';
import { config } from '../config';
import { PlatformIntegration, PlatformCustomer, PlatformSubscription, PlatformOrder } from './types';

export class RechargeIntegration implements PlatformIntegration {
  public readonly platform = 'recharge';
  private readonly apiUrl: string;
  private readonly accessToken: string;

  constructor() {
    this.apiUrl = config.platforms.recharge.apiUrl;
    this.accessToken = config.platforms.recharge.accessToken;
  }

  private get headers() {
    return {
      'X-Recharge-Access-Token': this.accessToken,
      'Content-Type': 'application/json',
    };
  }

  async fetchCustomers(): Promise<PlatformCustomer[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/customers`, {
        headers: this.headers,
        params: { limit: 250 },
      });

      return response.data.customers.map((customer: any) => ({
        id: `recharge_${customer.id}`,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        created_at: new Date(customer.created_at),
      }));
    } catch (error) {
      console.error('Error fetching Recharge customers:', error);
      return [];
    }
  }

  async fetchSubscriptions(): Promise<PlatformSubscription[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/subscriptions`, {
        headers: this.headers,
        params: { limit: 250 },
      });

      return response.data.subscriptions.map((sub: any) => ({
        id: `recharge_${sub.id}`,
        customer_id: `recharge_${sub.customer_id}`,
        status: sub.status.toLowerCase(),
        created_at: new Date(sub.created_at),
        cancelled_at: sub.cancelled_at ? new Date(sub.cancelled_at) : null,
        next_billing_date: sub.next_charge_scheduled_at ? new Date(sub.next_charge_scheduled_at) : null,
        mrr: parseFloat(sub.price) || 0,
      }));
    } catch (error) {
      console.error('Error fetching Recharge subscriptions:', error);
      return [];
    }
  }

  async fetchOrders(): Promise<PlatformOrder[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/charges`, {
        headers: this.headers,
        params: { limit: 250 },
      });

      return response.data.charges.map((charge: any) => ({
        id: `recharge_${charge.id}`,
        customer_id: `recharge_${charge.customer_id}`,
        subscription_id: charge.subscription_id ? `recharge_${charge.subscription_id}` : null,
        created_at: new Date(charge.created_at),
        total_price: parseFloat(charge.total_price),
      }));
    } catch (error) {
      console.error('Error fetching Recharge charges:', error);
      return [];
    }
  }
}
