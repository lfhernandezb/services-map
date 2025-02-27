import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { API } from './api.model';
import { sequelize } from '../../libs/sequelize';
import { BackendService } from './backend-service.model';

// Define attributes for APIConsumption
interface APIConsumptionAttributes {
  id: number;
  consumerType: 'frontend' | 'backend';
  consumerId: number;
  backendServiceId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface APIConsumptionCreationAttributes extends Optional<APIConsumptionAttributes, 'id' | 'createdAt'> {}

// Define APIConsumption model
class APIConsumption extends Model<APIConsumptionAttributes, APIConsumptionCreationAttributes> {
  public id!: number;
  public consumerType!: 'frontend' | 'backend';
  public consumerId!: number;
  public backendServiceId!: number;
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
    consumerType: {
      type: DataTypes.ENUM('frontend', 'backend'),
      allowNull: false,
      field: 'consumer_type',
    },
    consumerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'consumer_id',
    },
    backendServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'backend_service_id'
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
BackendService.hasMany(APIConsumption, { foreignKey: 'backendServiceId' });
APIConsumption.belongsTo(BackendService, { foreignKey: 'backendServiceId' });

export { APIConsumption, APIConsumptionAttributes };
