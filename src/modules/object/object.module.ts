import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectEntity } from '../../entities/object.entity';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectEntity])],
  providers: [ObjectService],
  controllers: [ObjectController],
})
export class ObjectModule {}
