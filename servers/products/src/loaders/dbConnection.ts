import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';
import { Seeder } from '../seed';

export const dbConnect = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: 'productdb.local',
      port: 3306,
      username: 'root',
      password: 'products',
      database: 'products',
      entities: [Product, Category],
      synchronize: true,
      logging: false,
    });
    console.log('DB Connected Successfully 🚀🚀🔥🔥');
    const dbSeeder = new Seeder();
    dbSeeder.init();
  } catch (err) {
    console.log('DB Connection Error', err);
  }
};
