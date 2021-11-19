import { AppLogger } from '@common-kitchen/common';
import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';

// TODO: Move this one to Common Package
class KafkaProducer {
  async produce(payloads: Array<ProduceRequest>, kafkaHost: string): Promise<void> {
    try {
      return await this.sendMessage(payloads, kafkaHost);
    } catch (err) {
      AppLogger.error(err);
    }
  }

  sendMessage(payloads: Array<ProduceRequest>, kafkaHost: string): Promise<void> {
    return new Promise((resolve, reject) => {
      AppLogger.log(`Start Producing Message to Kafka at Host = ${kafkaHost}`);
      const producer = new Producer(new KafkaClient({ kafkaHost }));
      producer.on('ready', () =>
        producer.send(payloads, (error, data) => (error ? reject(error) : resolve(data)))
      );
      producer.on('error', (err) => reject(err));
    });
  }
}
export const kafkaProducer = new KafkaProducer();
