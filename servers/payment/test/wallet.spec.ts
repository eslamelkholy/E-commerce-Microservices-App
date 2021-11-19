import { BadRequestError } from '@common-kitchen/common';
import { rejects } from 'assert';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import { WalletRepository } from '../src/repository/WalletRepository';
import { WalletService } from '../src/services/Wallet';
import { walletMock } from './mocks/wallet';

chai.use(require('chai-as-promised'));

let walletService: WalletService;
let walletRepository: WalletRepository;

describe('Wallet Service Test', () => {
  beforeEach(() => {
    sinon.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sinon.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown as Connection);
    walletService = new WalletService();
    walletRepository = new WalletRepository();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('WalletService - Create Functionality', () => {
    it('Throws Error If Wallet Already Exists', async () => {
      sinon.stub(walletRepository, 'find').resolves(walletMock[0]);
      try {
        await walletService.create(walletMock[0]);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });
  });
});
