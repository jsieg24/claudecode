import { GraphQLClient } from 'graphql-request';
import { config } from '../config';
import { PlatformIntegration, PlatformCustomer, PlatformSubscription, PlatformOrder } from './types';

export class SkioIntegration implements PlatformIntegration {
  public readonly platform = 'skio';
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(config.platforms.skio.apiUrl, {
      headers: {
        authorization: config.platforms.skio.accessToken,
      },
    });
  }

  async fetchCustomers(): Promise<PlatformCustomer[]> {
    try {
      const query = `
        query GetCustomers {
          customers {
            id
            firstName
            lastName
            email
            createdAt
          }
        }
      `;

      const data: any = await this.client.request(query);

      return data.customers.map((customer: any) => ({
        id: `skio_${customer.id}`,
        first_name: customer.firstName || '',
        last_name: customer.lastName || '',
        email: customer.email || '',
        created_at: new Date(customer.createdAt),
      }));
    } catch (error) {
      console.error('Error fetching SKIO customers:', error);
      return [];
    }
  }

  async fetchSubscriptions(): Promise<PlatformSubscription[]> {
    try {
      const query = `
        query GetSubscriptions {
          subscriptions {
            id
            customerId
            status
            createdAt
            cancelledAt
            nextBillingDate
            price
          }
        }
      `;

      const data: any = await this.client.request(query);

      return data.subscriptions.map((sub: any) => ({
        id: `skio_${sub.id}`,
        customer_id: `skio_${sub.customerId}`,
        status: sub.status.toLowerCase(),
        created_at: new Date(sub.createdAt),
        cancelled_at: sub.cancelledAt ? new Date(sub.cancelledAt) : null,
        next_billing_date: sub.nextBillingDate ? new Date(sub.nextBillingDate) : null,
        mrr: parseFloat(sub.price) || 0,
      }));
    } catch (error) {
      console.error('Error fetching SKIO subscriptions:', error);
      return [];
    }
  }

  async fetchOrders(): Promise<PlatformOrder[]> {
    try {
      const query = `
        query GetOrders {
          orders {
            id
            customerId
            subscriptionId
            createdAt
            totalPrice
          }
        }
      `;

      const data: any = await this.client.request(query);

      return data.orders.map((order: any) => ({
        id: `skio_${order.id}`,
        customer_id: `skio_${order.customerId}`,
        subscription_id: order.subscriptionId ? `skio_${order.subscriptionId}` : null,
        created_at: new Date(order.createdAt),
        total_price: parseFloat(order.totalPrice),
      }));
    } catch (error) {
      console.error('Error fetching SKIO orders:', error);
      return [];
    }
  }
}
