import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from '../../entities/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { DistrictEntity } from '../../entities/district.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,

    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
  ) {}

  async findAll(): Promise<RegionEntity[]> {
    return this.regionRepository.find();
  }

  async findOne(id: number): Promise<RegionEntity> {
    const region = await this.regionRepository.findOne({
      where: { id },
    });
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return region;
  }

  async create(dto: CreateRegionDto): Promise<RegionEntity> {
    const region = this.regionRepository.create(dto);
    return this.regionRepository.save(region);
  }

  async update(id: number, dto: UpdateRegionDto): Promise<RegionEntity> {
    const region = await this.findOne(id);
    Object.assign(region, dto);
    return this.regionRepository.save(region);
  }

  async delete(id: number): Promise<void> {
    const result = await this.regionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
  }

  async getDistrictsByRegionId(regionId: number): Promise<DistrictEntity[]> {
    return this.districtRepository.find({
      where: { region_id: regionId },
    });
  }
}
