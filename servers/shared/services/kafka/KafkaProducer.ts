import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import config from '../../../user/config';
import logger from '../../utils/logger';

class KafkaProducer {
  private producer: Producer;

  async produce(payloads: Array<ProduceRequest>): Promise<string> {
    try {
      return await this.sendMessage(payloads);
    } catch (err) {
      logger.error(err);
    }
  }

  sendMessage(payloads: Array<ProduceRequest>): Promise<string> {
    return new Promise((resolve, reject) => {
      this.producer = new Producer(new KafkaClient({ kafkaHost: config.KAFKA_HOST }));
      this.producer.on('ready', () =>
        this.producer.send(payloads, (error, data) => (error ? reject(error) : resolve(data)))
      );
      this.producer.on('error', (err) => reject(err));
    });
  }
}
export default new KafkaProducer();
