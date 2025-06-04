import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelTypeEntity } from '../../entities/model_type.entity';
import { CreateModelTypeDto } from './dto/create-model-type.dto';
import { UpdateModelTypeDto } from './dto/update-model-type.dto';
import { ModelEntity } from '../../entities/model.entity';

@Injectable()
export class ModelTypeService {
  constructor(
    @InjectRepository(ModelTypeEntity)
    private readonly repo: Repository<ModelTypeEntity>,

    @InjectRepository(ModelEntity)
    private readonly modelEntityRepository: Repository<ModelEntity>,
  ) {}

  async create(dto: CreateModelTypeDto): Promise<ModelTypeEntity> {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async findAll(): Promise<ModelTypeEntity[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ModelTypeEntity> {
    const item = await this.repo.findOne({
      where: { id },
    });
    if (!item) throw new NotFoundException(`ModelType with ID ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateModelTypeDto): Promise<ModelTypeEntity> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`ModelType with ID ${id} not found`);
  }

  async findAllModels(id: number): Promise<ModelEntity[]> {
    return await this.modelEntityRepository.find({ where: { model_id: id } });
  }
}
