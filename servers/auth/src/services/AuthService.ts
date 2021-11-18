import { AuthRepository } from '../repository/AuthRepository';
import { BadRequestError } from '@common-kitchen/common';

import { Password } from '../services/password';
import { UserDto } from '../dto/UserDto';
import { JwtService } from './Token/JwtService';

export class AuthService {
  public authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signin(email: string, password: string) {
    const existingUser = await this.findUserByEmail(email);

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = JwtService.generateToken(existingUser);
    return new UserDto(existingUser, userJwt);
  }

  async signup(email: string, password: string) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = await this.authRepository.createUser(email, password);

    const userJwt = JwtService.generateToken(user);
    return new UserDto(user, userJwt);
  }

  async findUserByEmail(email: string) {
    return await this.authRepository.findUserByEmail(email);
  }
}
