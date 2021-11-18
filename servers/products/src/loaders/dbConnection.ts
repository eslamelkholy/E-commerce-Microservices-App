import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Product } from '../entity/Product';

export const dbConnect = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: 'productdb.local',
      port: 3306,
      username: 'root',
      password: 'products',
      database: 'products',
      entities: [Product],
      synchronize: true,
      logging: false,
    });
    console.log('DB Connected Successfully 🚀🚀🔥🔥');
  } catch (err) {
    console.log('DB Connection Error', err);
  }
};
