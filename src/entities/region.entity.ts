import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DistrictEntity } from './district.entity';
import { OrderEntity } from './order.entity';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'regions' })
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_uz: string;

  @Column()
  name_ru: string;

  @OneToMany(() => DistrictEntity, (district) => district.region)
  districts: DistrictEntity[];

  @OneToMany(() => OrderEntity, (order) => order.region)
  orders: OrderEntity[];

  @OneToMany(() => ObjectEntity, (object) => object.region)
  objects: ObjectEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
