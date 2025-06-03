import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from '../../entities/district.entity';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  providers: [DistrictService],
  controllers: [DistrictController],
})
export class DistrictModule {}
