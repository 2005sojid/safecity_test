import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClassificationEntryEntity } from './classification_entries.entity';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'classifications' })
export class ClassificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ru: string;

  @Column()
  name_uz: string;

  @Column()
  name_en: string;

  @OneToMany(() => ClassificationEntryEntity, (object) => object.classification)
  entries: ClassificationEntryEntity[];

  @OneToMany(() => ObjectEntity, (object) => object.region)
  objects: ObjectEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
