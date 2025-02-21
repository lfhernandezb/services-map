import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../libs/sequelize';

// Define attributes for FrontendService
interface FrontendServiceAttributes {
  id: number;
  name: string;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface FrontendServiceCreationAttributes extends Optional<FrontendServiceAttributes, 'id' | 'createdAt'> {}

// Define FrontendService model
class FrontendService extends Model<FrontendServiceAttributes, FrontendServiceCreationAttributes> {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
}

// Initialize FrontendService model
FrontendService.init(
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
    tableName: 'FrontendService',
    timestamps: false, // Since we manually handle created_at
  }
);

export { FrontendService, FrontendServiceAttributes };
