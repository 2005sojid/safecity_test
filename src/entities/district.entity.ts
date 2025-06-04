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
import { RegionEntity } from './region.entity';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'districts' })
export class DistrictEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_uz: string;

  @Column()
  name_ru: string;

  @Column()
  region_id: number;

  @ManyToOne(() => RegionEntity, (region) => region.districts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @OneToMany(() => ObjectEntity, (object) => object.region)
  objects: ObjectEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
