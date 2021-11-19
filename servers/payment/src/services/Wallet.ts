import { BadRequestError } from '@common-kitchen/common';
import { Wallet } from '../entity/Wallet';
import { WalletRepository } from '../repository/WalletRepository';

export class WalletService {
  public walletRepository: WalletRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
  }
  async getAll() {
    return await this.walletRepository.findAll();
  }

  async create(userId: number, walletData: any) {
    const wallet = await this.walletRepository.find(userId);
    if (wallet) {
      throw new BadRequestError('This User Already Have wallet');
    }
    walletData.userId = walletData.id;
    delete walletData.id;
    delete walletData.balance;

    const walletRecord = await this.walletRepository.create({
      ...walletData,
    });

    return walletRecord;
  }
}
