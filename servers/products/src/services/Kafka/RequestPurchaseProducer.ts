import { EventProducer } from './EventProducer';
import { kafkaProducer } from '@common-kitchen/common';
import { KafkaTopics } from './topics';
import config from '../../config';

export class RequestPurchaseProducer implements EventProducer {
  produce(payload: any): void {
    kafkaProducer.sendMessage(
      [{ topic: KafkaTopics.REQUEST_PURCHASE, messages: JSON.stringify(payload), partition: 0 }],
      config.KAFKA_HOST
    );
  }
}
