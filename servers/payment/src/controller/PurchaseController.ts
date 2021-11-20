import { AppResponse } from '@common-kitchen/common';
import { NextFunction, Request, Response } from 'express';
import { PurchaseService } from '../services/Purchase';

export class PurchaseController {
  private purchaseService: PurchaseService;
  constructor() {
    this.purchaseService = new PurchaseService();
  }

  cancelPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const canceledPurchase = await this.purchaseService.cancelPurchase(req.body.id, req.currentUser?.id!);

      return res.send(new AppResponse(201, canceledPurchase));
    } catch (err) {
      next(err);
    }
  };

  getUserPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPurchases = await this.purchaseService.getUserPurchase(req.currentUser?.id!);

      return res.send(new AppResponse(201, userPurchases));
    } catch (err) {
      next(err);
    }
  };
}
