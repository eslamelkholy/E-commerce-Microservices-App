import { getRepository, Repository } from 'typeorm';
import { Product } from '../entity/Product';
export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  findAll() {
    return this.repository.find();
  }
}
