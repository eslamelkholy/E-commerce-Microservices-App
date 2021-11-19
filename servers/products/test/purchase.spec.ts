import { BadRequestError } from '@common-kitchen/common';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import { productMock } from './mocks/data/product';
import sinonChai from 'sinon-chai';
import { ProductRepository } from '../src/repository/ProductRepository';
import { PurchaseService } from '../src/services/PurchaseService';
import { RequestPurchaseProducer } from '../src/services/Kafka/RequestPurchaseProducer';

chai.use(sinonChai);

let purchaseService: PurchaseService;
let productRepository: ProductRepository;
let requestPurchaseProducer: RequestPurchaseProducer;

describe('PurchaseService Unit Tests', () => {
  beforeEach(() => {
    sinon.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sinon.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown as Connection);

    purchaseService = new PurchaseService();
    productRepository = new ProductRepository();
    requestPurchaseProducer = new RequestPurchaseProducer();

    purchaseService.productRepository = productRepository;
    purchaseService.requestPurchaseProducer = requestPurchaseProducer;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('ProductService - makePurchase Functionality', () => {
    it('Throws Error if Product Not Exists', async () => {
      sinon.stub(productRepository, 'find').resolves(undefined);
      try {
        await purchaseService.makePurchase(1, 'userId');
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Request New Purchase Through Kafka Messages', async () => {
      sinon.stub(productRepository, 'find').resolves(productMock[0]);
      sinon.stub(requestPurchaseProducer, 'produce').resolves(undefined);

      const expected = await purchaseService.makePurchase(1, 'userId');

      expect(expected).to.deep.equal({ message: 'Purchased Request Has Been Made Successfully' });
    });
  });
});
