import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { OrderEntity } from '../../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, OrderEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
