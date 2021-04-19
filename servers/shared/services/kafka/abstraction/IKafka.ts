import { KafkaClient } from 'kafka-node';

export default interface IKafka {
  client: KafkaClient;
}
