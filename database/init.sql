-- Subscription Analytics Database Schema

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    source_platform VARCHAR(50) NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for customers
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_source_platform ON customers(source_platform);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    cancelled_at TIMESTAMP,
    next_billing_date DATE,
    mrr DECIMAL(10, 2) NOT NULL DEFAULT 0,
    source_platform VARCHAR(50) NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create indexes for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_source_platform ON subscriptions(source_platform);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing_date ON subscriptions(next_billing_date);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    subscription_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    source_platform VARCHAR(50) NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
);

-- Create indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_subscription_id ON orders(subscription_id);
CREATE INDEX IF NOT EXISTS idx_orders_source_platform ON orders(source_platform);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create klaviyo_campaigns table
CREATE TABLE IF NOT EXISTS klaviyo_campaigns (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    sent_at TIMESTAMP,
    open_rate FLOAT NOT NULL DEFAULT 0,
    click_rate FLOAT NOT NULL DEFAULT 0,
    conversion_rate FLOAT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for klaviyo_campaigns
CREATE INDEX IF NOT EXISTS idx_klaviyo_campaigns_status ON klaviyo_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_klaviyo_campaigns_sent_at ON klaviyo_campaigns(sent_at);
