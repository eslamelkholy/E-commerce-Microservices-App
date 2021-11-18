import { ProductRepository } from '../repository/ProductRepository';

export class ProductService {
  public productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAll() {
    return await this.productRepository.findAll();
  }
}
