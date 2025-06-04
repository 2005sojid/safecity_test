import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelTypeEntity } from '../../entities/model_type.entity';
import { ModelTypeService } from './model_type.service';
import { ModelTypeController } from './model_type.controller';
import { ModelEntity } from '../../entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelTypeEntity, ModelEntity])],
  controllers: [ModelTypeController],
  providers: [ModelTypeService],
})
export class ModelTypeModule {}
