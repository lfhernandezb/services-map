import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../libs/sequelize';

// Define attributes for DBEngineType
interface DBEngineTypeAttributes {
  id: number;
  description: string;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface DBEngineTypeCreationAttributes extends Optional<DBEngineTypeAttributes, 'id' | 'createdAt'> {}

// Define DBEngineType model
class DBEngineType extends Model<DBEngineTypeAttributes, DBEngineTypeCreationAttributes> {
  public id!: number;
  public description!: string;
  public createdAt!: Date;
}

// Initialize DBEngineType model
DBEngineType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(100),
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
    tableName: 'DBEngineType',
    timestamps: false, // Since we manually handle created_at
  }
);

export { DBEngineType, DBEngineTypeAttributes };
