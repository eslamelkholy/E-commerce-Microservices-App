import { Request, Response } from 'express';
import KafkaProducer from '../../shared/services/kafka/KafkaProducer';
import logger from '../../shared/utils/logger';
import ProductService from '../services/Product';

export const get = async (req: Request, res: Response) => {
  const productService = new ProductService();
  const products = await productService.getAll();
  return res.status(200).send(products);
};

export const makeOrder = async (req: Request, res: Response) => {
  const payloads = [{ topic: 'ecommerce-topic', messages: 'To Product Consumer', partition: 0 }];
  const result = await KafkaProducer.produce(payloads);
  return res.status(200).send(result);
};
