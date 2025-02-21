import { Sequelize } from "sequelize";

const sequelize = new Sequelize("services-map", "services-map", "services-map", {
    host: "172.31.218.114",
    dialect: "mssql", // Change this to 'postgres', 'sqlite', or 'mssql' as needed
    logging: false, // Disable logging SQL queries (optional)
  });

  module.exports = sequelize;
