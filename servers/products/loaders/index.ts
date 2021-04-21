import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  // await mongooseLoader();
  expressLoader({ app: expressApp });
};
