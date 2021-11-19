import { AppLogger } from '@common-kitchen/common';
import { KafkaClient, Consumer } from 'kafka-node';
import { config } from '../../config';
import { IConsumer } from './IConsumer';

// TODO: Move to Package if have time
class RequestPurchaseConsumer implements IConsumer {
  private consumer: Consumer;
  constructor() {
    this.consumer = new Consumer(
      new KafkaClient({ kafkaHost: config.KAFKA_HOST }),
      [{ topic: 'request-purchase-topic' }],
      {
        autoCommit: false,
      }
    );
  }

  consumerInitializer(): void {
    AppLogger.log(`Starting [RequestPurchaseConsumer] Consumer Within Kafka Host ${config.KAFKA_HOST}`);
    this.consumer.on('message', ({ value, topic, partition }) => {
      // DO Something
      AppLogger.log(`${config.SERVER_NAME} Received New Message = ${value}`);
      AppLogger.log(`Over Topic = ${topic} and Partition = ${partition}`);
    });
    this.consumer.on('error', (error) => AppLogger.error(error));
  }
}

export const requestPurchaseConsumer = new RequestPurchaseConsumer();
