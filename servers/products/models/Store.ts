import mongoose from 'mongoose';
import Shopify from '../interface/Shopify/Shopify';

const storeSchema = new mongoose.Schema({
  url: String,
  tokens: Object,
  platform: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Shopify & mongoose.Document>('Store', storeSchema);
