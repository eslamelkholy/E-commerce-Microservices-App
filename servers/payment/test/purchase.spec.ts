import { BadRequestError } from '@common-kitchen/common';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import { PurchaseRepository } from '../src/repository/PurchaseRepository';
import { WalletRepository } from '../src/repository/WalletRepository';
import { PurchaseService } from '../src/services/Purchase';
import { purchaseMock } from './mocks/data/purchase';
import { walletMock } from './mocks/data/wallet';
import sinonChai from 'sinon-chai';

chai.use(require('chai-as-promised'));
chai.use(sinonChai);

let purchaseService: PurchaseService;
let walletRepository: WalletRepository;
let purchaseRepository: PurchaseRepository;

describe('Purchase Service Unit Tests', () => {
  beforeEach(() => {
    sinon.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sinon.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown as Connection);

    purchaseService = new PurchaseService();
    walletRepository = new WalletRepository();
    purchaseRepository = new PurchaseRepository();

    purchaseService.walletRepository = walletRepository;
    purchaseService.purchaseRepository = purchaseRepository;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('PurchaseService - getAll Functionality', () => {
    it('Returns all Purchase', async () => {
      sinon.stub(purchaseRepository, 'findAll').resolves(purchaseMock);

      const expected = await purchaseService.getAll();

      expect(expected).to.equal(purchaseMock);
    });
  });

  describe('PurchaseService - create Functionality', () => {
    it('Throws Error if There is Not Wallet Exists', async () => {
      sinon.stub(walletRepository, 'find').resolves(undefined);
      try {
        await purchaseService.create(purchaseMock[0]);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Reduce Balance From Wallet if ReducedBalance > 0', async () => {
      sinon.stub(walletRepository, 'find').resolves(walletMock[0]);
      sinon.stub(walletRepository, 'update').resolves(walletMock[0]);
      sinon.stub(purchaseService, 'reducedBalanceCalculate').resolves(100);
      sinon.stub(purchaseRepository, 'create').resolves(undefined);

      await purchaseService.create(purchaseMock[0]);
      expect(walletRepository.update).to.have.been.callCount(1);
    });

    it('Failed Purchase Request if Balance < 0', async () => {
      sinon.stub(walletRepository, 'find').resolves(walletMock[0]);
      sinon.stub(walletRepository, 'update').resolves(walletMock[0]);
      sinon.stub(purchaseRepository, 'create').resolves(undefined);
      sinon.stub(purchaseService, 'reducedBalanceCalculate').returns(-100);

      await purchaseService.create(purchaseMock[0]);

      expect(walletRepository.update).to.have.been.callCount(0);
      expect(purchaseRepository.create).to.have.been.callCount(1);
    });
  });

  describe('PurchaseService - cancelPurchase Functionality', () => {
    it('Throws Error if Purchase Item Not Found', async () => {
      sinon.stub(purchaseRepository, 'findPurchaseById').resolves(undefined);
      try {
        await purchaseService.cancelPurchase(1, walletMock[0].userId);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Throws Error Purchase Item Already Delivered', async () => {
      sinon.stub(purchaseRepository, 'findPurchaseById').resolves(purchaseMock[1]);
      try {
        await purchaseService.cancelPurchase(1, walletMock[0].userId);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Throws Error There is No Wallet', async () => {
      sinon.stub(purchaseRepository, 'findPurchaseById').resolves(purchaseMock[0]);
      sinon.stub(walletRepository, 'find').resolves(undefined);
      try {
        await purchaseService.cancelPurchase(1, walletMock[0].userId);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Update User Wallet and Request a New Purchase', async () => {
      sinon.stub(purchaseRepository, 'findPurchaseById').resolves(purchaseMock[0]);
      sinon.stub(walletRepository, 'find').resolves(walletMock[0]);
      sinon.stub(walletRepository, 'update').resolves(walletMock[0]);
      sinon.stub(purchaseRepository, 'update').resolves(purchaseMock[0]);

      await purchaseService.cancelPurchase(1, walletMock[0].userId);

      expect(walletRepository.update).to.have.been.callCount(1);
      expect(purchaseRepository.update).to.have.been.callCount(1);
    });
  });
});
