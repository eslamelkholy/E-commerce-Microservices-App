import expressLoader from './express';
import Logger from '../../shared/utils/logger/index';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  await mongooseLoader();
  expressLoader({ app: expressApp });
  Logger.log('✌️ Express loaded');
};
