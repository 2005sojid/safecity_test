import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClassificationSocialEntity } from './classification_social.entity';

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

  @OneToMany(
    () => ClassificationSocialEntity,
    (object) => object.classification,
  )
  entries: ClassificationSocialEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
