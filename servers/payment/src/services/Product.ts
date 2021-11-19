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
  async getAll() {
    return await this.productRepository.findAll();
  }

  async create(categoryId: number, product: Product) {
    const category = await this.categoryRepository.find(categoryId);
    if (!category) {
      throw new BadRequestError('Category Not Found!');
    }

    const productRecord = await this.productRepository.create({ ...product, ...category });

    return productRecord;
  }
}
