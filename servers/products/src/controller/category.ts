import { AppResponse } from '@common-kitchen/common';
import { Request, Response } from 'express';
import { CategoryService } from '../services/Category';

export class CategoryController {
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
  }

  get = async (_: Request, res: Response) => {
    const products = await this.categoryService.getAll();

    return res.status(200).send(new AppResponse(200, products));
  };

  post = async (req: Request, res: Response) => {
    const product = await this.categoryService.create(req.body);

    return res.send(new AppResponse(201, product));
  };
}
