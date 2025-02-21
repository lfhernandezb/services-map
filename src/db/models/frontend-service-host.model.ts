import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { Host } from './host.model';

import { sequelize } from '../../libs/sequelize';
import { FrontendService } from './frontend-service.model';

// Define attributes for FrontendServiceHost
interface FrontendServiceHostAttributes {
  id: number;
  hostId: number;
  frontendServiceId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface FrontendServiceHostCreationAttributes
  extends Optional<FrontendServiceHostAttributes, 'id' | 'createdAt'> {}

// Define FrontendServiceHost model
class FrontendServiceHost extends Model<
  FrontendServiceHostAttributes,
  FrontendServiceHostCreationAttributes
> {
  public id!: number;
  public hostId!: number;
  public frontendServiceId!: number;
  public createdAt!: Date;
}

// Initialize FrontendServiceHost model
FrontendServiceHost.init(
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
    frontendServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'frontendservice_id',
      references: {
        model: FrontendService,
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
    tableName: 'FrontendServiceHost',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
Host.hasMany(FrontendServiceHost, { foreignKey: 'hostId' });
FrontendService.hasMany(FrontendServiceHost, { foreignKey: 'frontendServiceId' });
FrontendServiceHost.belongsTo(Host, { foreignKey: 'hostId' });
FrontendServiceHost.belongsTo(FrontendService, { foreignKey: 'frontendServiceId' });

export { FrontendServiceHost, FrontendServiceHostAttributes };
