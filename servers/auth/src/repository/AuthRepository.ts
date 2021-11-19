import { User, UserDoc } from '../models/user';

export class AuthRepository {
  public static readonly MAX_LIMIT = 1000000;
  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async createUser(email: string, password: string): Promise<UserDoc> {
    const user = User.build({ email, password, maxAllowedLimit: AuthRepository.MAX_LIMIT });
    await user.save();
    return user;
  }
}
