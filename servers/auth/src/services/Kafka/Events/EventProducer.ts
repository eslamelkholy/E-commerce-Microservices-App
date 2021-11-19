export interface EventProducer {
  produce(payload: any): void;
}
