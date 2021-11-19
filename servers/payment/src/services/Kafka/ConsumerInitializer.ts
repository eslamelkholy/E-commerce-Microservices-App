import { reqisteredUserConsumer } from './RegisteredUserConsumer';
import { requestPurchaseConsumer } from './RequestPurchaseConsumer';

class ConsumerInitializer {
  startConsume() {
    requestPurchaseConsumer.consumerInitializer();
    reqisteredUserConsumer.consumerInitializer();
  }
}

export const consumerInitializer = new ConsumerInitializer();
