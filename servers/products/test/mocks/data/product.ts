import { Product } from '../../../src/entity/Product';
import { categoryMock } from './category';

export const productMock: Product[] = [
  {
    id: 1,
    status: 'ACTIVE',
    category: categoryMock[0],
    description: 'Product Desc',
    imageUrl: '',
    name: 'Prod Name',
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
