import { AppResponse } from '@common-kitchen/common';
import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/Product';

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  get = async (_: Request, res: Response) => {
    const products = await this.productService.getAll();

    return res.status(200).send(new AppResponse(200, products));
  };

  post = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.body;

      const product = await this.productService.create(categoryId, req.body);

      return res.send(new AppResponse(201, product));
    } catch (err) {
      next(err);
    }
  };
}
