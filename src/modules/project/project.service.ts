import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<ProjectEntity> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async create(data: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async update(
    id: number,
    data: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    await this.projectRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async findAllOrders(id: number): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ where: { project_id: id } });
  }
}
