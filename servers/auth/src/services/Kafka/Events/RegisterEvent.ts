import { config } from '../../../config';
import { EventProducer } from './EventProducer';
import { kafkaProducer } from '../Producer';
import { KafkaTopics } from './topics';

export class RegisterEvent implements EventProducer {
  produce(payload: any): void {
    kafkaProducer.sendMessage(
      [{ topic: KafkaTopics.USER_REGISTERED, messages: JSON.stringify(payload), partition: 0 }],
      config.KAFKA_HOST
    );
  }
}
