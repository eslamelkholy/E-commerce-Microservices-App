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
    const reducedBalance = this.reducedBalanceCalculate(userWallet.balance, requestPurchase.price);

    if (reducedBalance < 0) {
      status = PurchaseStatus.FAILED;
    } else {
      await this.walletRepository.update({
        ...userWallet,
        balance: reducedBalance,
      });
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

  async cancelPurchase(id: number, userId: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findPurchaseById(id);
    if (!purchase) {
      throw new BadRequestError('Sorry Purchase Not Found');
    }

    if (purchase.status === PurchaseStatus.DELIVERED) {
      throw new BadRequestError('Sorry Cannot Cancel Delivered Purchase');
    }

    const userWallet = await this.walletRepository.find(userId);
    if (!userWallet) {
      throw new BadRequestError('Sorry User Wallet Not Found');
    }

    await this.walletRepository.update({
      ...userWallet,
      balance: this.calculateBalanceAfterCancel(userWallet.balance, purchase.price),
    });

    const updatedPurchase = await this.purchaseRepository.update({
      ...purchase,
      status: PurchaseStatus.CANCELED,
    });

    return updatedPurchase;
  }

  async getUserPurchase(userId: string): Promise<Purchase[]> {
    const userPurchases = await this.purchaseRepository.getUserPurchases(userId);

    return userPurchases;
  }

  calculateBalanceAfterCancel(oldBalance: number, price: number): number {
    return oldBalance + price;
  }

  reducedBalanceCalculate(walletBalance: number, purchaseBalance: number): number {
    return walletBalance - purchaseBalance;
  }
}
