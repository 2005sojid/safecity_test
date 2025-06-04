import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from '../../entities/order.entity';
import { RegionEntity } from '../../entities/region.entity';
import { ProjectEntity } from '../../entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, RegionEntity, ProjectEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
