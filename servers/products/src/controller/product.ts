import { AppResponse } from '@common-kitchen/common';
import { Request, Response } from 'express';
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
}
