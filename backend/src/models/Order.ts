import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface OrderAttributes {
  id: string;
  customer_id: string;
  subscription_id: string | null;
  created_at: Date;
  total_price: number;
  source_platform: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'subscription_id'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public customer_id!: string;
  public subscription_id!: string | null;
  public created_at!: Date;
  public total_price!: number;
  public source_platform!: string;

  public readonly updatedAt!: Date;
}

Order.init(
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
    subscription_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'subscriptions',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_price: {
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
    tableName: 'orders',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt',
    indexes: [
      { fields: ['customer_id'] },
      { fields: ['subscription_id'] },
      { fields: ['source_platform'] },
      { fields: ['created_at'] },
    ],
  }
);
