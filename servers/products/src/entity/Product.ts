import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  currency: string;

  @Column()
  status: string;
}
