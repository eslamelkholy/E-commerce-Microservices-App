import { AppResponse } from '@common-kitchen/common';
import { NextFunction, Request, Response } from 'express';
import { PurchaseService } from '../services/Purchase';

export class PurchaseController {
  private purchaseService: PurchaseService;
  constructor() {
    this.purchaseService = new PurchaseService();
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.send(new AppResponse(201, { success: 'Hello World' }));
    } catch (err) {
      next(err);
    }
  };
}
