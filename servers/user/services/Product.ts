import ProductRepository from '../repository/ProductRepository';
export default class ProductService {
  constructor() {}
  async getAll() {
    const productRepo = new ProductRepository();
    return await productRepo.getProducts();
  }
}
