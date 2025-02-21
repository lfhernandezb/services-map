import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { Host } from './host.model';
import { BackendService } from './backend-service.model';
import { sequelize } from '../../libs/sequelize';

// Define attributes for BackendServiceHost
interface BackendServiceHostAttributes {
  id: number;
  hostId: number;
  backendServiceId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface BackendServiceHostCreationAttributes
  extends Optional<BackendServiceHostAttributes, 'id' | 'createdAt'> {}

// Define BackendServiceHost model
class BackendServiceHost extends Model<
  BackendServiceHostAttributes,
  BackendServiceHostCreationAttributes
> {
  public id!: number;
  public hostId!: number;
  public backendServiceId!: number;
  public createdAt!: Date;
}

// Initialize BackendServiceHost model
BackendServiceHost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'host_id',
      references: {
        model: Host,
        key: 'id',
      },
    },
    backendServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'backendservice_id',
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
    tableName: 'BackendServiceHost',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
Host.hasMany(BackendServiceHost, { foreignKey: 'hostId' });
BackendService.hasMany(BackendServiceHost, { foreignKey: 'backendServiceId' });
BackendServiceHost.belongsTo(Host, { foreignKey: 'hostId' });
BackendServiceHost.belongsTo(BackendService, { foreignKey: 'backendServiceId' });

export { BackendServiceHost, BackendServiceHostAttributes };
