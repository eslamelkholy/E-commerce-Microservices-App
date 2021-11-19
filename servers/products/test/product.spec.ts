import { BadRequestError } from '@common-kitchen/common';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import { productMock } from './mocks/data/product';
import sinonChai from 'sinon-chai';
import { ProductService } from '../src/services/Product';
import { ProductRepository } from '../src/repository/ProductRepository';
import { CategoryRepository } from '../src/repository/CategoryRepository';

chai.use(require('chai-as-promised'));
chai.use(sinonChai);

let productService: ProductService;
let productRepository: ProductRepository;
let categoryRepository: CategoryRepository;

describe('ProductService Unit Tests', () => {
  beforeEach(() => {
    sinon.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sinon.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown as Connection);

    productService = new ProductService();
    productRepository = new ProductRepository();
    categoryRepository = new CategoryRepository();

    productService.productRepository = productRepository;
    productService.categoryRepository = categoryRepository;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('ProductService - getAll Functionality', () => {
    it('Returns all Purchase', async () => {
      sinon.stub(productRepository, 'findAll').resolves(productMock);

      const expected = await productService.getAll(1000);

      expect(expected).to.equal(productMock);
    });
  });
});
