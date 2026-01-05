import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SubscriptionAttributes {
  id: string;
  customer_id: string;
  status: string;
  created_at: Date;
  cancelled_at: Date | null;
  next_billing_date: Date | null;
  mrr: number;
  source_platform: string;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, 'id' | 'cancelled_at' | 'next_billing_date'> {}

export class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
  public id!: string;
  public customer_id!: string;
  public status!: string;
  public created_at!: Date;
  public cancelled_at!: Date | null;
  public next_billing_date!: Date | null;
  public mrr!: number;
  public source_platform!: string;

  public readonly updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    next_billing_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    mrr: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    source_platform: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subscriptions',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt',
    indexes: [
      { fields: ['customer_id'] },
      { fields: ['status'] },
      { fields: ['source_platform'] },
      { fields: ['created_at'] },
      { fields: ['next_billing_date'] },
    ],
  }
);
