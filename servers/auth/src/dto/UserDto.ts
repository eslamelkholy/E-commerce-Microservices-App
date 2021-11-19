import { ObjectId } from 'mongoose';
import { UserDoc } from '../models/user';

export class UserDto {
  public id?: ObjectId;
  public email: string;
  public maxAllowedLimit: number;
  public jwt?: string;

  constructor(user: UserDoc, jwt?: string) {
    this.id = user.id;
    this.email = user.email;
    this.maxAllowedLimit = user.maxAllowedLimit;
    this.jwt = jwt;
  }
}
