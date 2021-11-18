import expressLoader from './express';
import { Application } from 'express';
import { dbConnect } from './dbConnection';

export default async (app: Application) => {
  await dbConnect();
  expressLoader(app);
};
