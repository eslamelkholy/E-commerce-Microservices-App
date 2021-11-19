import { AppLogger } from '@common-kitchen/common';
import { KafkaClient, Consumer } from 'kafka-node';
import { config } from '../../config';
import { WalletService } from '../Wallet';

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
      AppLogger.log(`$Over Topic = ${topic} Received New Message = ${value} `);

      const walletService = new WalletService();
      walletService.create(JSON.parse(value + ''));
    });
    this.consumer.on('error', (error) => AppLogger.error(error));
  }
}

export const reqisteredUserConsumer = new ReqisteredUserConsumer();
