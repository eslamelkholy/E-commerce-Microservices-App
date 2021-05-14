import { KafkaClient, Consumer } from 'kafka-node';
import config from '../../../user/config';
import logger from '../../utils/logger';

class KafkaConsumer {
  private consumer: Consumer;
  constructor() {
    this.consumer = new Consumer(new KafkaClient({ kafkaHost: config.KAFKA_HOST }), [{ topic: 'ecommerce-topic' }], {
      autoCommit: false,
    });
  }

  consumerInitializer(): void {
    console.log(`Starting Consumer Within Kafka Host ${config.KAFKA_HOST}`);
    this.consumer.on('message', ({ value, topic, partition }) => {
      // DO Something
      logger.log(`${config.SERVER_NAME} Received New Message = ${value}`);
      logger.log(`Over Topic = ${topic} and Partition = ${partition}`);
    });
    this.consumer.on('error', (error) => logger.error(error));
  }
}
export default new KafkaConsumer();
