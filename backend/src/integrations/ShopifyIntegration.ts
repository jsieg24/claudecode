import axios from 'axios';
import { config } from '../config';
import { PlatformIntegration, PlatformCustomer, PlatformSubscription, PlatformOrder } from './types';

export class ShopifyIntegration implements PlatformIntegration {
  public readonly platform = 'shopify';
  private readonly shopUrl: string;
  private readonly accessToken: string;
  private readonly apiVersion = '2024-01';

  constructor() {
    this.shopUrl = config.platforms.shopify.shopUrl;
    this.accessToken = config.platforms.shopify.accessToken;
  }

  private get baseUrl(): string {
    return `https://${this.shopUrl}/admin/api/${this.apiVersion}`;
  }

  private get headers() {
    return {
      'X-Shopify-Access-Token': this.accessToken,
      'Content-Type': 'application/json',
    };
  }

  async fetchCustomers(): Promise<PlatformCustomer[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/customers.json`, {
        headers: this.headers,
        params: { limit: 250 },
      });

      return response.data.customers.map((customer: any) => ({
        id: `shopify_${customer.id}`,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        created_at: new Date(customer.created_at),
      }));
    } catch (error) {
      console.error('Error fetching Shopify customers:', error);
      return [];
    }
  }

  async fetchSubscriptions(): Promise<PlatformSubscription[]> {
    // Shopify doesn't have native subscriptions - this would need to be
    // implemented via Shopify's Subscription API or third-party apps
    console.warn('Shopify native subscriptions not implemented - use SKIO, Recharge, or Stay.ai');
    return [];
  }

  async fetchOrders(): Promise<PlatformOrder[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/orders.json`, {
        headers: this.headers,
        params: {
          limit: 250,
          status: 'any',
        },
      });

      return response.data.orders.map((order: any) => ({
        id: `shopify_${order.id}`,
        customer_id: order.customer ? `shopify_${order.customer.id}` : '',
        subscription_id: null, // Would need to be mapped from subscription apps
        created_at: new Date(order.created_at),
        total_price: parseFloat(order.total_price),
      }));
    } catch (error) {
      console.error('Error fetching Shopify orders:', error);
      return [];
    }
  }
}
