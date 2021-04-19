import IKafka from './abstraction/IKafka';
import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import config from '../../../user/config';
import { ProducerMessages } from './constants/Producer';
import logger from '../../utils/logger';

class KafkaProducer implements IKafka {
  private producer: Producer;
  private isProducerReady: boolean;
  client: KafkaClient;

  constructor() {
    this.client = new KafkaClient({ kafkaHost: config.KAFKA_HOST });
    this.producer = new Producer(this.client);
    this.isProducerReady = false;
  }

  async produce(payloads: Array<ProduceRequest>): Promise<string> {
    try {
      if (!this.isProducerReady) await this.producerInitializer();
      return await this.sendMessage(payloads);
    } catch (err) {
      logger.error(err);
    }
  }

  producerInitializer(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.producer.on('ready', () => {
        this.isProducerReady = true;
        logger.log('Kafka Producer is Now Ready!!');
        return resolve(ProducerMessages.INITIALIZED_SUCCESS);
      });
      this.producer.on('error', (err) => {
        this.isProducerReady = false;
        return reject(err);
      });
    });
  }

  sendMessage(payloads: Array<ProduceRequest>): Promise<string> {
    return new Promise((resolve, reject) => {
      this.producer.send(payloads, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
}
export default new KafkaProducer();
