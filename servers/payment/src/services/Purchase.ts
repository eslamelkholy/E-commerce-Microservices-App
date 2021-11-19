import { BadRequestError } from '@common-kitchen/common';
import { Purchase } from '../entity/Purchase';
import { PurchaseRepository } from '../repository/PurchaseRepository';

export class PurchaseService {
  public purchaseRepository: PurchaseRepository;

  constructor() {
    this.purchaseRepository = new PurchaseRepository();
  }
  async getAll() {
    return await this.purchaseRepository.findAll();
  }

  async create(categoryId: number, purchase: Purchase) {
    const category = await this.purchaseRepository.find(categoryId);
    if (!category) {
      throw new BadRequestError('Category Not Found!');
    }

    const purchaseRecord = await this.purchaseRepository.create({ ...purchase, ...category });

    return purchaseRecord;
  }
}
