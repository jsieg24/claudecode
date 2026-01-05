import axios from 'axios';
import { config } from '../config';
import { PlatformIntegration, PlatformCustomer, PlatformSubscription, PlatformOrder } from './types';

export class StayAiIntegration implements PlatformIntegration {
  public readonly platform = 'stay_ai';
  private readonly apiUrl: string;
  private readonly accessToken: string;

  constructor() {
    this.apiUrl = config.platforms.stayAi.apiUrl;
    this.accessToken = config.platforms.stayAi.accessToken;
  }

  private get headers() {
    return {
      'X-RETEXTION-ACCESS-TOKEN': this.accessToken,
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
        id: `stay_ai_${customer.id}`,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        created_at: new Date(customer.created_at),
      }));
    } catch (error) {
      console.error('Error fetching Stay.ai customers:', error);
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
        id: `stay_ai_${sub.id}`,
        customer_id: `stay_ai_${sub.customer_id}`,
        status: sub.status.toLowerCase(),
        created_at: new Date(sub.created_at),
        cancelled_at: sub.cancelled_at ? new Date(sub.cancelled_at) : null,
        next_billing_date: sub.next_order_date ? new Date(sub.next_order_date) : null,
        mrr: parseFloat(sub.price) || 0,
      }));
    } catch (error) {
      console.error('Error fetching Stay.ai subscriptions:', error);
      return [];
    }
  }

  async fetchOrders(): Promise<PlatformOrder[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/orders`, {
        headers: this.headers,
        params: { limit: 250 },
      });

      return response.data.orders.map((order: any) => ({
        id: `stay_ai_${order.id}`,
        customer_id: `stay_ai_${order.customer_id}`,
        subscription_id: order.subscription_id ? `stay_ai_${order.subscription_id}` : null,
        created_at: new Date(order.created_at),
        total_price: parseFloat(order.total_price),
      }));
    } catch (error) {
      console.error('Error fetching Stay.ai orders:', error);
      return [];
    }
  }
}
