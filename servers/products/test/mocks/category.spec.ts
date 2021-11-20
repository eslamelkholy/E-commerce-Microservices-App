import chai, { expect } from 'chai';
import sinon from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';
import sinonChai from 'sinon-chai';
import { CategoryService } from '../../src/services/Category';
import { CategoryRepository } from '../../src/repository/CategoryRepository';
import { categoryMock } from './data/category';

chai.use(sinonChai);

let categoryService: CategoryService;
let categoryRepository: CategoryRepository;

describe('CategoryService Unit Tests', () => {
  beforeEach(() => {
    sinon.stub(ConnectionManager.prototype, 'get').returns({
      getRepository: sinon.stub().returns(sinon.createStubInstance(Repository)),
    } as unknown as Connection);

    categoryService = new CategoryService();
    categoryRepository = new CategoryRepository();

    categoryService.categoryRepository = categoryRepository;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('CategoryService - getAll Functionality', () => {
    it('Returns All Available Categories', async () => {
      sinon.stub(categoryRepository, 'findAll').resolves(categoryMock);

      const expected = await categoryService.getAll();

      expect(expected).to.equal(categoryMock);
    });
  });

  describe('CategoryService - create Functionality', () => {
    it('Add New Category Successfully', async () => {
      sinon.stub(categoryRepository, 'create').resolves(categoryMock[0]);

      const expected = await categoryService.create(categoryMock[0]);

      expect(expected).to.deep.equal(categoryMock[0]);
    });
  });
});
