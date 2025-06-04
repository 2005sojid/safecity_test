import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassificationEntity } from './classification.entity';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'classification_entries' })
export class ClassificationEntryEntity {
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

  @OneToMany(() => ObjectEntity, (object) => object.region)
  objects: ObjectEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
