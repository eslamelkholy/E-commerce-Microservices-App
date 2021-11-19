import { getRepository, Repository } from 'typeorm';
import { Purchase } from '../entity/Purchase';
export class PurchaseRepository {
  private repository: Repository<Purchase>;

  constructor() {
    this.repository = getRepository(Purchase);
  }

  findAll() {
    return this.repository.find();
  }

  find(productId: number) {
    return this.repository.findOne(productId);
  }

  findPurchaseById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  findCategoryproducts(categoryId: number) {
    return this.repository.find({ where: { category: categoryId } });
  }

  create(product: Purchase) {
    const productRecord = this.repository.create(product);
    return this.repository.save(productRecord);
  }

  delete(productId: number) {
    return this.repository.delete({ id: productId });
  }

  update(purchase: Purchase) {
    return this.repository.save(purchase);
  }
}
