import { getRepository, Repository } from 'typeorm';
import { Wallet } from '../entity/Wallet';

export class WalletRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = getRepository(Wallet);
  }

  findAll() {
    return this.repository.find();
  }

  find(userId: string) {
    return this.repository.findOne({ where: { userId } });
  }

  findCategorywalleds(categoryId: number) {
    return this.repository.find({ where: { category: categoryId } });
  }

  create(wallet: Wallet) {
    const walledRecord = this.repository.create(wallet);
    return this.repository.save(walledRecord);
  }

  delete(walledId: number) {
    return this.repository.delete({ id: walledId });
  }

  update(wallet: Wallet) {
    return this.repository.save(wallet);
  }
}
