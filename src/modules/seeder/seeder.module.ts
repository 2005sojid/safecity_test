import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from '../../entities/region.entity';
import { DistrictEntity } from '../../entities/district.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { ClassificationEntity } from '../../entities/classification.entity';
import { OrderEntity } from '../../entities/order.entity';
import { ClassificationSocialEntity } from '../../entities/classification_social.entity';
import { ModelEntity } from '../../entities/model.entity';
import { ModelTypeEntity } from '../../entities/model_type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionEntity,
      DistrictEntity,
      ProjectEntity,
      ClassificationEntity,
      OrderEntity,
      ClassificationSocialEntity,
      ModelEntity,
      ModelTypeEntity,
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
