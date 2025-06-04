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
import { ProjectEntity } from './project.entity';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  region_id: number;

  @Column()
  project_id: number;

  @ManyToOne(() => RegionEntity, (region) => region.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => ObjectEntity, (object) => object.region)
  objects: ObjectEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
