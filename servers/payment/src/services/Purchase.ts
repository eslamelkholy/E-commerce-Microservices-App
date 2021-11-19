import { BadRequestError } from '@common-kitchen/common';
import { Purchase } from '../entity/Purchase';
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

  async cancelPurchase(id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findPurchaseById(id);
    if (!purchase) {
      throw new BadRequestError('Sorry Purchase Not Found');
    }

    if (purchase.status === PurchaseStatus.DELIVERED) {
      throw new BadRequestError('Sorry Cannot Cancel Delivered Purchase');
    }

    const updatedPurchase = await this.purchaseRepository.update({
      ...purchase,
      status: PurchaseStatus.CANCELED,
    });

    return updatedPurchase;
  }
}
