import { Customer, Subscription, Order, KlaviyoCampaign } from '../models';
import {
  ShopifyIntegration,
  SkioIntegration,
  RechargeIntegration,
  StayAiIntegration,
  KlaviyoIntegration,
  PlatformIntegration,
} from '../integrations';

export class SyncService {
  private platformIntegrations: PlatformIntegration[];
  private klaviyoIntegration: KlaviyoIntegration;

  constructor() {
    this.platformIntegrations = [
      new ShopifyIntegration(),
      new SkioIntegration(),
      new RechargeIntegration(),
      new StayAiIntegration(),
    ];
    this.klaviyoIntegration = new KlaviyoIntegration();
  }

  async syncAll(): Promise<void> {
    console.log('🔄 Starting full sync...');

    await this.syncCustomers();
    await this.syncSubscriptions();
    await this.syncOrders();
    await this.syncKlaviyoCampaigns();

    console.log('✅ Full sync completed');
  }

  async syncCustomers(): Promise<void> {
    console.log('🔄 Syncing customers...');

    for (const integration of this.platformIntegrations) {
      try {
        const customers = await integration.fetchCustomers();

        for (const customer of customers) {
          await Customer.upsert({
            id: customer.id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            created_at: customer.created_at,
            source_platform: integration.platform,
          });
        }

        console.log(`✅ Synced ${customers.length} customers from ${integration.platform}`);
      } catch (error) {
        console.error(`❌ Error syncing customers from ${integration.platform}:`, error);
      }
    }
  }

  async syncSubscriptions(): Promise<void> {
    console.log('🔄 Syncing subscriptions...');

    for (const integration of this.platformIntegrations) {
      try {
        const subscriptions = await integration.fetchSubscriptions();

        for (const subscription of subscriptions) {
          await Subscription.upsert({
            id: subscription.id,
            customer_id: subscription.customer_id,
            status: subscription.status,
            created_at: subscription.created_at,
            cancelled_at: subscription.cancelled_at,
            next_billing_date: subscription.next_billing_date,
            mrr: subscription.mrr,
            source_platform: integration.platform,
          });
        }

        console.log(`✅ Synced ${subscriptions.length} subscriptions from ${integration.platform}`);
      } catch (error) {
        console.error(`❌ Error syncing subscriptions from ${integration.platform}:`, error);
      }
    }
  }

  async syncOrders(): Promise<void> {
    console.log('🔄 Syncing orders...');

    for (const integration of this.platformIntegrations) {
      try {
        const orders = await integration.fetchOrders();

        for (const order of orders) {
          await Order.upsert({
            id: order.id,
            customer_id: order.customer_id,
            subscription_id: order.subscription_id,
            created_at: order.created_at,
            total_price: order.total_price,
            source_platform: integration.platform,
          });
        }

        console.log(`✅ Synced ${orders.length} orders from ${integration.platform}`);
      } catch (error) {
        console.error(`❌ Error syncing orders from ${integration.platform}:`, error);
      }
    }
  }

  async syncKlaviyoCampaigns(): Promise<void> {
    console.log('🔄 Syncing Klaviyo campaigns...');

    try {
      const campaigns = await this.klaviyoIntegration.fetchCampaigns();

      for (const campaign of campaigns) {
        await KlaviyoCampaign.upsert({
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          sent_at: campaign.sent_at,
          open_rate: campaign.open_rate,
          click_rate: campaign.click_rate,
          conversion_rate: campaign.conversion_rate,
        });
      }

      console.log(`✅ Synced ${campaigns.length} Klaviyo campaigns`);
    } catch (error) {
      console.error('❌ Error syncing Klaviyo campaigns:', error);
    }
  }
}
