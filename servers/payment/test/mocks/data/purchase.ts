import { Purchase } from '../../../src/entity/Purchase';
import { PurchaseStatus } from '../../../src/types/Purchase/Purchase';

export const purchaseMock: Purchase[] = [
  {
    id: 1,
    status: 'PENDING',
    description: 'Description',
    imageUrl: '',
    name: 'Purchase Name',
    price: 100,
    productId: 1,
    userId: '61980575f3e65f00a695abaf',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    status: PurchaseStatus.DELIVERED,
    description: 'Description',
    imageUrl: '',
    name: 'Purchase Name',
    price: 100,
    productId: 1,
    userId: '61980575f3e65f00a695abaf',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
