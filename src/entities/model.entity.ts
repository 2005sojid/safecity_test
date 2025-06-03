import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ModelTypeEntity } from './model_type.entity';

@Entity({ name: 'models' })
export class ModelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model_id: number;

  @ManyToOne(() => ModelTypeEntity, (model_type) => model_type.entries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'model_id' })
  modelType: ModelTypeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
