import dotenv from 'dotenv';
import { ProcessEnv } from '../types/Enviroment/index';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export const config = {
  PORT: process.env.PORT,
  IN_PROD: process.env.IN_PROD,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_NAME: process.env.SERVER_NAME,
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT!),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
} as ProcessEnv;
