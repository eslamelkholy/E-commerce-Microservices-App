import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from '../config';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';

export const dbConnect = async () => {
  console.log(config.DB_HOST);
  try {
    await createConnection({
      type: 'mysql',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [Product, Category],
      synchronize: true,
      logging: false,
    });
    console.log('DB Connected Successfully 🚀🚀🔥🔥');
  } catch (err) {
    console.log('DB Connection Error', err);
  }
};