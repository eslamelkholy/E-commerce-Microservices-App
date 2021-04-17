import expressLoader from './express';
import Logger from '../utils/logger';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  await mongooseLoader();
  expressLoader({ app: expressApp });
  Logger.log('✌️ Express loaded');
};
