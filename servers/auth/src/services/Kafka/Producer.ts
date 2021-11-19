import { AppLogger } from '@common-kitchen/common';
import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';
import { config } from '../../config';

class KafkaProducer {
  async produce(payloads: Array<ProduceRequest>): Promise<void> {
    try {
      return await this.sendMessage(payloads);
    } catch (err) {
      AppLogger.error(err);
    }
  }

  sendMessage(payloads: Array<ProduceRequest>): Promise<void> {
    return new Promise((resolve, reject) => {
      AppLogger.log(`Start Producing Message to Kafka at Host = ${config.KAFKA_HOST}`);
      const producer = new Producer(new KafkaClient({ kafkaHost: config.KAFKA_HOST }));
      producer.on('ready', () =>
        producer.send(payloads, (error, data) => (error ? reject(error) : resolve(data)))
      );
      producer.on('error', (err) => reject(err));
    });
  }
}
export default new KafkaProducer();
