import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../libs/sequelize';

// Define attributes for Host
interface HostAttributes {
  id: number;
  name: string;
  ipAddress: string;
  type: string;
  createdAt: Date;
}

// Define optional fields for creation (id auto-increments, createdAt defaults)
interface HostCreationAttributes extends Optional<HostAttributes, 'id' | 'createdAt'> {}

// Define Host model
class Host extends Model<HostAttributes, HostCreationAttributes> {
  public id!: number;
  public name!: string;
  public ipAddress!: string;
  public type!: string;
  public createdAt!: Date;
}

// Initialize Host model
Host.init(
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
    ipAddress: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'ip_address'
    },
    type: {
      type: DataTypes.STRING(50),
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
    tableName: 'Host',
    timestamps: false, // Since we manually handle created_at
  }
);

export { Host, HostAttributes };
