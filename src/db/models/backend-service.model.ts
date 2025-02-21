import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../libs/sequelize';

// Define attributes for BackendService
interface BackendServiceAttributes {
  id: number;
  name: string;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface BackendServiceCreationAttributes extends Optional<BackendServiceAttributes, 'id' | 'createdAt'> {}

// Define BackendService model
class BackendService extends Model<BackendServiceAttributes, BackendServiceCreationAttributes> {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
}

// Initialize BackendService model
BackendService.init(
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // SQL Server default
    },
  },
  {
    sequelize,
    tableName: 'BackendService',
    timestamps: false, // Since we manually handle created_at
  }
);

export { BackendService, BackendServiceAttributes };
