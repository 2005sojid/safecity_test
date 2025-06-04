import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from '../../entities/model.entity';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity])],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
