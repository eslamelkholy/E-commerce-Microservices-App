import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  productId: number;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
