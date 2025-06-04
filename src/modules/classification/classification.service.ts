import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassificationEntity } from '../../entities/classification.entity';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { ClassificationEntryEntity } from '../../entities/classification_entries.entity';
import { CreateClassificationEntryDto } from './dto/create-entry.dto';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(ClassificationEntity)
    private readonly repo: Repository<ClassificationEntity>,

    @InjectRepository(ClassificationEntryEntity)
    private readonly classificationEntityRepository: Repository<ClassificationEntryEntity>,
  ) {}

  async create(dto: CreateClassificationDto): Promise<ClassificationEntity> {
    const classification = this.repo.create(dto);
    return this.repo.save(classification);
  }

  async findAll(): Promise<ClassificationEntity[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ClassificationEntity> {
    const item = await this.repo.findOne({
      where: { id },
    });
    if (!item)
      throw new NotFoundException(`Classification with ID ${id} not found`);
    return item;
  }

  async update(
    id: number,
    dto: UpdateClassificationDto,
  ): Promise<ClassificationEntity> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Classification with ID ${id} not found`);
  }

  async findAllEntries(id: number): Promise<ClassificationEntryEntity[]> {
    return await this.classificationEntityRepository.find({
      where: { classification_id: id },
    });
  }

  async createEntry(
    id: number,
    dto: CreateClassificationEntryDto,
  ): Promise<ClassificationEntryEntity> {
    return await this.classificationEntityRepository.save({
      name_uz: dto.name_uz,
      name_en: dto.name_en,
      name_ru: dto.name_ru,
      classification_id: id,
    });
  }
}
