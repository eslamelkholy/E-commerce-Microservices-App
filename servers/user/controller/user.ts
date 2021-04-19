import { Request, Response } from 'express';
import KafkaProducer from '../../shared/services/kafka/KafkaProducer';
import ProductService from '../services/Product';

export const get = async (req: Request, res: Response) => {
  const productService = new ProductService();
  const products = await productService.getAll();
  return res.status(200).send(products);
};

export const makeOrder = async (req: Request, res: Response) => {
  const producerMsgs = await KafkaProducer.produce([
    {
      messages: 'Hello World From Kafka Producer',
      topic: 'ecommerce-topic',
    },
  ]);
  return res.status(200).send(producerMsgs);
};
