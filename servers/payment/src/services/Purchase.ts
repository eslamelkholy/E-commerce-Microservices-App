import { BadRequestError } from '@common-kitchen/common';
import { PurchaseRepository } from '../repository/PurchaseRepository';
import { WalletRepository } from '../repository/WalletRepository';
import { PurchaseStatus } from '../types/Purchase/Purchase';

export class PurchaseService {
  public purchaseRepository: PurchaseRepository;
  public walletRepository: WalletRepository;

  constructor() {
    this.purchaseRepository = new PurchaseRepository();
    this.walletRepository = new WalletRepository();
  }
  async getAll() {
    return await this.purchaseRepository.findAll();
  }

  async create(requestPurchase: any) {
    const userWallet = await this.walletRepository.find(requestPurchase.userId);
    if (!userWallet) {
      throw new BadRequestError('No Wallet For This User');
    }

    let status = PurchaseStatus.INPROGRESS;
    if (userWallet.balance - requestPurchase.price < 0) {
      status = PurchaseStatus.FAILED;
    }

    const productId = requestPurchase.id;
    delete requestPurchase.id;

    const purchaseRecord = await this.purchaseRepository.create({
      ...requestPurchase,
      productId,
      status,
    });

    return purchaseRecord;
  }
}
