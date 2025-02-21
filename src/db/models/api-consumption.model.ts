import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { API } from './api.model';
import { sequelize } from '../../libs/sequelize';

// Define attributes for APIConsumption
interface APIConsumptionAttributes {
  id: number;
  apiId: number;
  consumerType: 'frontend' | 'backend';
  consumerId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface APIConsumptionCreationAttributes extends Optional<APIConsumptionAttributes, 'id' | 'createdAt'> {}

// Define APIConsumption model
class APIConsumption extends Model<APIConsumptionAttributes, APIConsumptionCreationAttributes> {
  public id!: number;
  public apiId!: number;
  public consumerType!: 'frontend' | 'backend';
  public consumerId!: number;
  public createdAt!: Date;
}

// Initialize APIConsumption model
APIConsumption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: API,
        key: 'id',
      },
    },
    consumerType: {
      type: DataTypes.ENUM('frontend', 'backend'),
      allowNull: false,
    },
    consumerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    tableName: 'APIConsumption',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
API.hasMany(APIConsumption, { foreignKey: 'apiId' });
APIConsumption.belongsTo(API, { foreignKey: 'apiId' });

export { APIConsumption, APIConsumptionAttributes };
