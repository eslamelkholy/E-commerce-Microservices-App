import { BadRequestError } from '@common-kitchen/common';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import { productMock } from './mocks/data/product';
import sinonChai from 'sinon-chai';
import { ProductService } from '../src/services/Product';
import { ProductRepository } from '../src/repository/ProductRepository';
import { CategoryRepository } from '../src/repository/CategoryRepository';
import { categoryMock } from './mocks/data/category';

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

  describe('ProductService - create Functionality', () => {
    it('Throws Error if Category Not Exists', async () => {
      sinon.stub(categoryRepository, 'find').resolves(undefined);
      try {
        await productService.create(1, productMock[0]);
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequestError);
      }
    });

    it('Creates New Product if Category Already Exists', async () => {
      sinon.stub(categoryRepository, 'find').resolves(categoryMock[0]);
      sinon.stub(productRepository, 'create').resolves(productMock[0]);

      await productService.create(1, productMock[0]);

      expect(productRepository.create).to.have.been.callCount(1);
    });
  });
});
