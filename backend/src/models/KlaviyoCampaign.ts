import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface KlaviyoCampaignAttributes {
  id: string;
  name: string;
  status: string;
  sent_at: Date | null;
  open_rate: number;
  click_rate: number;
  conversion_rate: number;
}

interface KlaviyoCampaignCreationAttributes extends Optional<KlaviyoCampaignAttributes, 'id' | 'sent_at'> {}

export class KlaviyoCampaign extends Model<KlaviyoCampaignAttributes, KlaviyoCampaignCreationAttributes> implements KlaviyoCampaignAttributes {
  public id!: string;
  public name!: string;
  public status!: string;
  public sent_at!: Date | null;
  public open_rate!: number;
  public click_rate!: number;
  public conversion_rate!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

KlaviyoCampaign.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    open_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    click_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    conversion_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'klaviyo_campaigns',
    timestamps: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['sent_at'] },
    ],
  }
);
