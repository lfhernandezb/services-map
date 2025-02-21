import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../libs/sequelize';
import { Host } from './host.model';
import { DBEngineType } from './db-engine-type.model';

// Define attributes for DBEngine
interface DBEngineAttributes {
  id: number;
  name: string;
  hostId: number;
  dbEngineTypeId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface DBEngineCreationAttributes extends Optional<DBEngineAttributes, 'id' | 'createdAt'> {}

// Define DBEngine model
class DBEngine extends Model<DBEngineAttributes, DBEngineCreationAttributes> {
  public id!: number;
  public name!: string;
  public hostId!: number;
  public dbEngineTypeId!: number;
  public createdAt!: Date;
}

// Initialize DBEngine model
DBEngine.init(
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
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'host_id',
      references: {
        model: Host,
        key: 'id',
      },
    },
    dbEngineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'dbenginetype_id',
      references: {
        model: DBEngineType,
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
    tableName: 'DBEngine',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
Host.hasMany(DBEngine, { foreignKey: 'hostId' });
DBEngineType.hasMany(DBEngine, { foreignKey: 'dbEngineTypeId' });
DBEngine.belongsTo(Host, { foreignKey: 'hostId' });
DBEngine.belongsTo(DBEngineType, { foreignKey: 'dbEngineTypeId' });

export { DBEngine, DBEngineAttributes };
