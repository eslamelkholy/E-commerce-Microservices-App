export interface ProcessEnv {
  PORT: string;
  LOGGER: string;
  NODE_ENV: string;
  IN_PROD: string;
  DATABASE_URL: string;
  SERVER_NAME: string;

  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  KAFKA_HOST: string;
}
