import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';
import { ClassificationEntity } from '../../entities/classification.entity';
import { ClassificationEntryEntity } from '../../entities/classification_entries.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassificationEntity, ClassificationEntryEntity]),
  ],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
