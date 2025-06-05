import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectEntity } from '../../entities/object.entity';
import { ObjectFilters } from './interfaces/filters.interface';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(ObjectEntity)
    private readonly objectRepository: Repository<ObjectEntity>,
  ) {}

  async findAll(filters?: ObjectFilters & { page?: number; limit?: number }) {
    const query = this.objectRepository
      .createQueryBuilder('object')
      .leftJoinAndSelect('object.region', 'region')
      .leftJoinAndSelect('object.district', 'district')
      .leftJoinAndSelect('object.project', 'project')
      .leftJoinAndSelect('object.order', 'order')
      .leftJoinAndSelect('object.classification', 'classification')
      .leftJoinAndSelect('object.classificationEntry', 'classificationEntry')
      .select([
        'object.id',
        'object.ip',
        'object.speed',
        'object.speedUnit',
        'object.latitude',
        'object.longitude',
        'object.connectionType',
        'object.location',
        'region.name_uz',
        'district.name_uz',
        'project.name_uz',
      ]);

    // Apply filters
    if (filters) {
      if (filters.regionId) {
        query.andWhere('object.region_id = :regionId', {
          regionId: filters.regionId,
        });
      }
      if (filters.districtId) {
        query.andWhere('object.district_id = :districtId', {
          districtId: filters.districtId,
        });
      }
      if (filters.projectId) {
        query.andWhere('object.project_id = :projectId', {
          projectId: filters.projectId,
        });
      }
      if (filters.orderId) {
        query.andWhere('object.order_id = :orderId', {
          orderId: filters.orderId,
        });
      }
      if (filters.classificationId) {
        query.andWhere('object.classification_id = :classificationId', {
          classificationId: filters.classificationId,
        });
      }
      if (filters.classificationEntryId) {
        query.andWhere(
          'object.classification_entry_id = :classificationEntryId',
          {
            classificationEntryId: filters.classificationEntryId,
          },
        );
      }

      // Apply pagination
      const page = filters.page ?? 1;
      const limit = Math.min(filters.limit ?? 10, 100); // enforce max limit
      const skip = (page - 1) * limit;

      query.skip(skip).take(limit);
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page: filters?.page ?? 1,
      lastPage: Math.ceil(total / (filters?.limit ?? 10)),
    };
  }

  findOne(id: number) {
    return this.objectRepository
      .createQueryBuilder('object')
      .leftJoinAndSelect('object.region', 'region')
      .leftJoinAndSelect('object.district', 'district')
      .leftJoinAndSelect('object.project', 'project')
      .leftJoinAndSelect('object.order', 'order')
      .leftJoinAndSelect('object.classification', 'classification')
      .leftJoinAndSelect('object.classificationEntry', 'classificationEntry')
      .select([
        'object.id',
        'object.ip',
        'object.speed',
        'object.speedUnit',
        'object.latitude',
        'object.longitude',
        'object.connectionType',
        'object.location',
        'region.name_uz',
        'district.name_uz',
        'project.name_uz',
      ])
      .where('object.id = :id', { id })
      .getRawOne();
  }

  create(data: Partial<ObjectEntity>) {
    const obj = this.objectRepository.create(data);
    return this.objectRepository.save(obj);
  }

  async update(id: number, data: Partial<ObjectEntity>) {
    await this.objectRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.objectRepository.delete(id);
  }
}
