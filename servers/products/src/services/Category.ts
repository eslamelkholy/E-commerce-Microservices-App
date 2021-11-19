import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/CategoryRepository';

export class CategoryService {
  public categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async create(category: Category) {
    const productRecord = await this.categoryRepository.create({ ...category });

    return productRecord;
  }
}
