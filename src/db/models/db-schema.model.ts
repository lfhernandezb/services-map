import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { DBEngine } from './db-engine.model';
import { sequelize } from '../../libs/sequelize';

// Define attributes for DBSchema
interface DBSchemaAttributes {
  id: number;
  name: string;
  dbengineId: number;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface DBSchemaCreationAttributes extends Optional<DBSchemaAttributes, 'id' | 'createdAt'> {}

// Define DBSchema model
class DBSchema extends Model<DBSchemaAttributes, DBSchemaCreationAttributes> {
  public id!: number;
  public name!: string;
  public dbengineId!: number;
  public createdAt!: Date;
}

// Initialize DBSchema model
DBSchema.init(
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
    dbengineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'dbengine_id',
      references: {
        model: DBEngine,
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
    tableName: 'DBSchema',
    timestamps: false, // Since we manually handle created_at
  }
);

// Define associations
DBEngine.hasMany(DBSchema, { foreignKey: 'dbengineId' });
DBSchema.belongsTo(DBEngine, { foreignKey: 'dbengineId' });

export { DBSchema, DBSchemaAttributes };
