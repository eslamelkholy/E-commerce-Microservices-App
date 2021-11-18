import { ObjectId } from 'mongoose';
import { UserDoc } from '../models/user';

export class UserDto {
  public id?: ObjectId;
  public email: string;
  public jwt?: string;

  constructor(user: UserDoc, jwt?: string) {
    this.id = user.id;
    this.email = user.email;
    this.jwt = jwt;
  }
}
