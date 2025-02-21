import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { config } from '../config/config';

// Database connection (Replace with your actual credentials)
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  port: Number(config.dbPort),
  dialect: 'mssql', // SQL Server
  logging: false,   // Disable logging (optional)
});

export { sequelize };
