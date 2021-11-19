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

  find(productId: number) {
    return this.repository.findOne(productId);
  }

  findCategoryproducts(categoryId: number) {
    return this.repository.find({ where: { category: categoryId } });
  }

  create(product: Product) {
    const productRecord = this.repository.create(product);
    return this.repository.save(productRecord);
  }

  delete(productId: number) {
    return this.repository.delete({ id: productId });
  }
}
