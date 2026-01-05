import { Customer } from './Customer';
import { Subscription } from './Subscription';
import { Order } from './Order';
import { KlaviyoCampaign } from './KlaviyoCampaign';

// Define relationships
Customer.hasMany(Subscription, { foreignKey: 'customer_id', as: 'subscriptions' });
Subscription.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

Subscription.hasMany(Order, { foreignKey: 'subscription_id', as: 'orders' });
Order.belongsTo(Subscription, { foreignKey: 'subscription_id', as: 'subscription' });

export { Customer, Subscription, Order, KlaviyoCampaign };
