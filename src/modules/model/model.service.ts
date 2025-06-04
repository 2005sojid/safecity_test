import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from '../../entities/model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(ModelEntity)
    private readonly repo: Repository<ModelEntity>,
  ) {}

  async create(dto: CreateModelDto): Promise<ModelEntity> {
    const model = this.repo.create(dto);
    return this.repo.save(model);
  }

  async findAll(): Promise<ModelEntity[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ModelEntity> {
    const model = await this.repo.findOne({
      where: { id },
    });
    if (!model) throw new NotFoundException(`Model with ID ${id} not found`);
    return model;
  }

  async update(id: number, dto: UpdateModelDto): Promise<ModelEntity> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Model with ID ${id} not found`);
  }
}
