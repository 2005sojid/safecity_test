import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictEntity } from '../../entities/district.entity';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
  ) {}

  async findAll(): Promise<DistrictEntity[]> {
    return this.districtRepository.find();
  }

  async findOne(id: number): Promise<DistrictEntity> {
    return this.districtRepository.findOne({ where: { id } });
  }

  async create(dto: CreateDistrictDto): Promise<DistrictEntity> {
    const district = this.districtRepository.create(dto);
    return this.districtRepository.save(district);
  }

  async update(id: number, dto: UpdateDistrictDto): Promise<DistrictEntity> {
    await this.districtRepository.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.districtRepository.delete(id);
  }
}
