export default class ProductRepository {
  async getProducts(): Promise<Array<Object>> {
    return [
      {
        name: 'Product1',
        value: '10$',
      },
    ];
  }
}
