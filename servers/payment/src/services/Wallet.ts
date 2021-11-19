import { BadRequestError } from '@common-kitchen/common';
import { Wallet } from '../entity/Wallet';
import { WalletRepository } from '../repository/WalletRepository';
import { WalletDto } from '../types/WalletDto';

export class WalletService {
  public walletRepository: WalletRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
  }
  async getAll() {
    return await this.walletRepository.findAll();
  }

  async create(walletData: any) {
    const wallet = await this.walletRepository.find(walletData.id);
    if (wallet) {
      throw new BadRequestError('This User Already Have wallet');
    }
    const userId = walletData.id;
    delete walletData.id;

    const walletRecord = await this.walletRepository.create({
      ...walletData,
      userId,
    });

    return walletRecord;
  }
}
