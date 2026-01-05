export interface PlatformCustomer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
}

export interface PlatformSubscription {
  id: string;
  customer_id: string;
  status: string;
  created_at: Date;
  cancelled_at: Date | null;
  next_billing_date: Date | null;
  mrr: number;
}

export interface PlatformOrder {
  id: string;
  customer_id: string;
  subscription_id: string | null;
  created_at: Date;
  total_price: number;
}

export interface PlatformIntegration {
  platform: string;
  fetchCustomers(): Promise<PlatformCustomer[]>;
  fetchSubscriptions(): Promise<PlatformSubscription[]>;
  fetchOrders(): Promise<PlatformOrder[]>;
}
