import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CustomerAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  source_platform: string;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public created_at!: Date;
  public source_platform!: string;

  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    source_platform: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt',
    indexes: [
      { fields: ['email'] },
      { fields: ['source_platform'] },
      { fields: ['created_at'] },
    ],
  }
);
