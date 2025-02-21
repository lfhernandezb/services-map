// require('dotenv').config();
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
    dbUser: string;
    dbPassword: string;
    dbHost: string;
    dbName: string;
    dbPort: string;
}


console.log(":", process.env.DB_HOST);
console.log(":", process.env.DB_PORT);

/*
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
}
*/

// Validate required env variables
const getConfig = (): EnvConfig => {
    if (!process.env.DB_USER) {
      throw new Error("Missing DB_USER in .env");
    }
    if (!process.env.DB_PASSWORD) {
      throw new Error("Missing DB_PASSWORD in .env");
    }
    if (!process.env.DB_HOST) {
        throw new Error("Missing DB_HOST in .env");
    }
    if (!process.env.DB_NAME) {
        throw new Error("Missing DB_NAME in .env");
    }
    if (!process.env.DB_PORT) {
        throw new Error("Missing DB_PORT in .env");
    }

    return {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
};
  };


// module.exports = { config };
export const config = getConfig();
