import dotenv from 'dotenv';
import { ProcessEnv } from '../types/Enviroment/index';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  PORT: process.env.PORT,
  IN_PROD: process.env.IN_PROD,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,
  SERVER_NAME: process.env.SERVER_NAME,
  KAFKA_HOST: process.env.KAFKA_HOST,
} as ProcessEnv;
