import { AppResponse } from '@common-kitchen/common';
import { NextFunction, Request, Response } from 'express';
import { WalletService } from '../services/Wallet';

export class WalletController {
  private walletService: WalletService;
  constructor() {
    this.walletService = new WalletService();
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.currentUser!.id);

      const walltet = await this.walletService.create(userId, { ...req.body, ...req.currentUser });

      return res.send(new AppResponse(201, walltet));
    } catch (err) {
      next(err);
    }
  };
}
