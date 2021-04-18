import { Schema, Document, model } from 'mongoose';
import IProduct from '../interface/IProduct';

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IProduct & Document>('Product', ProductSchema);
