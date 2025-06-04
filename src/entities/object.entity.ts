import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { ProjectEntity } from './project.entity';
import { DistrictEntity } from './district.entity';
import { OrderEntity } from './order.entity';
import { ClassificationEntity } from './classification.entity';
import { ClassificationEntryEntity } from './classification_entries.entity';

@Entity({ name: 'objects' })
export class ObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  speed: number;

  @Column()
  speedUnit: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  connectionType: string;

  @Column()
  region_id: number;

  @Column()
  district_id: number;

  @Column()
  project_id: number;

  @Column()
  order_id: number;

  @Column()
  classification_id: number;

  @Column()
  classification_entry_id: number;

  @Column()
  location: string;

  @ManyToOne(() => RegionEntity, (region) => region.objects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.objects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @ManyToOne(() => DistrictEntity, (district) => district.objects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity;

  @ManyToOne(() => OrderEntity, (order) => order.objects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(
    () => ClassificationEntity,
    (classification) => classification.objects,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'classification_id' })
  classification: ClassificationEntity;

  @ManyToOne(
    () => ClassificationEntryEntity,
    (classificationEntry) => classificationEntry.objects,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'classification_entry_id' })
  classificationEntry: ClassificationEntryEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
