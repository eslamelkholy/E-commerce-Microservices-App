import { getRepository, LessThanOrEqual, Repository } from 'typeorm';
import { Product } from '../entity/Product';
export class ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  findAll(maxAllowedLimit: number) {
    return this.repository.find({
      where: {
        price: LessThanOrEqual(maxAllowedLimit),
      },
    });
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

  findOne() {
    return this.repository.findOne();
  }
}
