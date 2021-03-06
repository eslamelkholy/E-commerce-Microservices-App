import { BadRequestError } from '@common-kitchen/common';
import { ProductRepository } from '../repository/ProductRepository';
import { RequestPurchaseProducer } from './Kafka/RequestPurchaseProducer';

export class PurchaseService {
  public productRepository: ProductRepository;
  public requestPurchaseProducer: RequestPurchaseProducer;

  constructor() {
    this.productRepository = new ProductRepository();
    this.requestPurchaseProducer = new RequestPurchaseProducer();
  }

  async makePurchase(productId: number, userId: string) {
    const product = await this.productRepository.find(productId);
    if (!product) {
      throw new BadRequestError('Sorry Product Not Found');
    }

    this.requestPurchaseProducer.produce({ ...product, productId: product.id, userId });

    return { message: 'Purchased Request Has Been Made Successfully' };
  }
}
