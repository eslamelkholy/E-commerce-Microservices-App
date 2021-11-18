import { AppResponse } from '@common-kitchen/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userResult = await this.authService.signin(email, password);

    return res.status(200).json(new AppResponse(200, userResult));
  };

  signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userResult = await this.authService.signup(email, password);

    return res.status(200).json(new AppResponse(200, userResult));
  };
}
