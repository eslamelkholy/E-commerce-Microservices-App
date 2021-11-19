import { BadRequestError } from '@common-kitchen/common';
import { Product } from '../entity/Product';
import { CategoryRepository } from '../repository/CategoryRepository';
import { ProductRepository } from '../repository/ProductRepository';

export class ProductService {
  public productRepository: ProductRepository;
  public categoryRepository: CategoryRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
  }
  async getAll(maxAllowedLimit: number) {
    return await this.productRepository.findAll(maxAllowedLimit);
  }

  async create(categoryId: number, product: Product) {
    const category = await this.categoryRepository.find(categoryId);
    if (!category) {
      throw new BadRequestError('Category Not Found!');
    }

    const productRecord = await this.productRepository.create({ ...product, category: category });

    return productRecord;
  }
}
