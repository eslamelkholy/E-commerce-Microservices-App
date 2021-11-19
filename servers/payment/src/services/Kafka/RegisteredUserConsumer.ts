import { AppLogger } from '@common-kitchen/common';
import { KafkaClient, Consumer } from 'kafka-node';
import { config } from '../../config';

// TODO: Move to Package if have time
class ReqisteredUserConsumer {
  private consumer: Consumer;
  constructor() {
    this.consumer = new Consumer(
      new KafkaClient({ kafkaHost: config.KAFKA_HOST }),
      [{ topic: 'user-registered-topic' }],
      {
        autoCommit: false,
      }
    );
  }

  consumerInitializer(): void {
    AppLogger.log(`Starting [ReqisteredUserConsumer] Consumer Within Kafka Host ${config.KAFKA_HOST}`);
    this.consumer.on('message', ({ value, topic, partition }) => {
      // DO Something
      AppLogger.log(`${config.SERVER_NAME} Received New Message = ${value}`);
      AppLogger.log(`Over Topic = ${topic} and Partition = ${partition}`);
    });
    this.consumer.on('error', (error) => AppLogger.error(error));
  }
}

export const reqisteredUserConsumer = new ReqisteredUserConsumer();
