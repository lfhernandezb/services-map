import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { BackendService } from './backend-service.model';
import { sequelize } from '../../libs/sequelize';

// Define attributes for API
interface APIAttributes {
  id: number;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  backendServiceId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface APICreationAttributes extends Optional<APIAttributes, 'id' | 'createdAt'> {}

// Define API model
class API extends Model<APIAttributes, APICreationAttributes> {
  public id!: number;
  public name!: string;
  public method!: 'GET' | 'POST' | 'PUT' | 'DELETE';
  public path!: string;
  public backendServiceId!: number;
  public createdAt!: Date;
}

// Initialize API model
API.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM('GET', 'POST', 'PUT', 'DELETE'),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    backendServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'backend_service_id',
      references: {
        model: BackendService,
        key: 'id',
      },
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
    tableName: 'API',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
BackendService.hasMany(API, { foreignKey: 'backendServiceId' });
API.belongsTo(BackendService, { foreignKey: 'backendServiceId' });

export { API, APIAttributes };
