import { Category } from '../../../src/entity/Category';

export const categoryMock: Category[] = [
  {
    id: 1,
    status: 'PENDING',
    description: 'Description',
    imageUrl: '',
    name: 'Category Name',
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
