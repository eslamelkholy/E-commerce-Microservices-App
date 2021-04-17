import { Request, Response } from 'express';
import ProductService from '../services/Product';

export const get = async (req: Request, res: Response) => {
  const productService = new ProductService();
  const products = await productService.getAll();
  return res.status(200).send(products);
};
