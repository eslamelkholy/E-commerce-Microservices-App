import { User, UserDoc } from '../models/user';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async createUser(email: string, password: string): Promise<UserDoc> {
    const user = User.build({ email, password });
    await user.save();
    return user;
  }
}
