import { BadRequestError } from '@common-kitchen/common';
import { ProductRepository } from '../repository/ProductRepository';
import { RequestPurchase } from './Kafka/RequestPurchase';

export class PurchaseService {
  public productRepository: ProductRepository;
  public requestPurchase: RequestPurchase;

  constructor() {
    this.productRepository = new ProductRepository();
    this.requestPurchase = new RequestPurchase();
  }

  async makePurchase(productId: number, userId: string) {
    const product = await this.productRepository.find(productId);
    if (!product) {
      throw new BadRequestError('Sorry Product Not Found');
    }

    this.requestPurchase.produce({ ...product, userId });

    return { message: 'Purchased Request Has Been Made Successfully' };
  }
}
