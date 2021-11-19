import { UserDto } from '../../dto/UserDto';
import jwt from 'jsonwebtoken';

// TODO: Use Adapter Pattern To use Different ways to Generate Auth Token Like oauth2

export class JwtService {
  static generateToken(user: UserDto): string {
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        maxAllowedLimit: user.maxAllowedLimit,
      },
      process.env.JWT_KEY!
    );
    return userJwt;
  }
}
