import { AppResponse } from '@common-kitchen/common';
import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/Product';
import { PurchaseService } from '../services/PurchaseService';

export class PurchaseController {
  private purchaseService: PurchaseService;
  constructor() {
    this.purchaseService = new PurchaseService();
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.body;
      const userId = req.currentUser?.id;

      const response = await this.purchaseService.makePurchase(productId, userId!);

      return res.send(new AppResponse(201, response));
    } catch (err) {
      next(err);
    }
  };
}
