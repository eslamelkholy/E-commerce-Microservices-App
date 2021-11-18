import { ObjectId } from 'mongoose';
import { UserDoc } from '../models/user';

export class UserDto {
  public id?: ObjectId;
  public email: string;

  constructor(user: UserDoc) {
    this.id = user.id;
    this.email = user.email;
  }
}
