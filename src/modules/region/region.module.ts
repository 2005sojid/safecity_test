import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../../entities/region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { DistrictEntity } from '../../entities/district.entity';
import { OrderEntity } from '../../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionEntity, DistrictEntity, OrderEntity]),
  ],
  providers: [RegionService],
  controllers: [RegionController],
  exports: [RegionService],
})
export class RegionModule {}
