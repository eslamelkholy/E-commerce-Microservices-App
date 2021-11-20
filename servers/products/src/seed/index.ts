import { AppLogger } from '@common-kitchen/common';
import { CategoryRepository } from '../repository/CategoryRepository';
import { ProductRepository } from '../repository/ProductRepository';
import { categorySeed } from './category';
import { productSeed } from './product';

export class Seeder {
  public productRepository: ProductRepository;
  public categoryRepository: CategoryRepository;
  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async init() {
    const isItemsAlreadySeeded = await this.productRepository.findOne();

    if (isItemsAlreadySeeded) return;

    AppLogger.log('Start DB Seeding Loading....');

    for (const category of categorySeed) await this.categoryRepository.create(category);

    for (const product of productSeed) await this.productRepository.create(product);
    AppLogger.log('Finished DB Seeding 🚀🚀🔥🔥');
  }
}
