import { Schema, Document, model } from 'mongoose';
import IUser from '../interface/IUser';

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IUser & Document>('User', UserSchema);
