import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { BackendService } from './backend-service.model';
import { sequelize } from '../../libs/sequelize';
import { DBSchema } from './db-schema.model';

// Define attributes for BackendToDBAccess
interface BackendToDBAccessAttributes {
  id: number;
  backendServiceId: number;
  dbschemaId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface BackendToDBAccessCreationAttributes extends Optional<BackendToDBAccessAttributes, 'id' | 'createdAt'> {}

// Define BackendToDBAccess model
class BackendToDBAccess extends Model<BackendToDBAccessAttributes, BackendToDBAccessCreationAttributes> {
  public id!: number;
  public backendServiceId!: number;
  public dbschemaId!: number;
  public createdAt!: Date;
}

// Initialize BackendToDBAccess model
BackendToDBAccess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    backendServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BackendService,
        key: 'id',
      },
    },
    dbschemaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DBSchema,
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
    tableName: 'BackendToDBAccess',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
BackendService.hasMany(BackendToDBAccess, { foreignKey: 'backendServiceId' });
DBSchema.hasMany(BackendToDBAccess, { foreignKey: 'dbschemaId' });

BackendToDBAccess.belongsTo(BackendService, { foreignKey: 'backendServiceId' });
BackendToDBAccess.belongsTo(DBSchema, { foreignKey: 'dbschemaId' });

export { BackendToDBAccess, BackendToDBAccessAttributes };
