import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassificationEntity } from './classification.entity';

@Entity({ name: 'classifications_social' })
export class ClassificationSocialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ru: string;

  @Column()
  name_uz: string;

  @Column()
  name_en: string;

  @Column()
  classification_id: number;

  @ManyToOne(
    () => ClassificationEntity,
    (classification) => classification.entries,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'classification_id' })
  classification: ClassificationEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
