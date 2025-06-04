import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { RegionEntity } from '../../entities/region.entity';
import { DistrictEntity } from '../../entities/district.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { ClassificationEntity } from '../../entities/classification.entity';
import { ClassificationEntryEntity } from '../../entities/classification_entries.entity';
import { ModelEntity } from '../../entities/model.entity';
import { ModelTypeEntity } from '../../entities/model_type.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,

    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,

    @InjectRepository(ClassificationEntity)
    private readonly classificationRepository: Repository<ClassificationEntity>,

    @InjectRepository(ClassificationEntryEntity)
    private readonly classificationSocialRepository: Repository<ClassificationEntryEntity>,

    @InjectRepository(ModelEntity)
    private readonly modelRepository: Repository<ModelEntity>,

    @InjectRepository(ModelTypeEntity)
    private readonly modelTypeRepository: Repository<ModelTypeEntity>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRegions();
    await this.seedDistricts();
    await this.seedProjects();
    await this.seedClassifications();
    await this.seedClassificationSocial();
    await this.seedModelTypes();
    await this.seedModels();
  }

  private async seedModelTypes() {
    const count = await this.modelTypeRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'model_types.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`model_types.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const modelTypes = JSON.parse(data);

    for (const modelType of modelTypes) {
      await this.modelTypeRepository.save({
        name: modelType.name,
      });

      this.logger.log(`Seeded model type: ${modelType.name}`);
    }
  }

  private async seedModels() {
    const count = await this.modelRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'models.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`models.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const models = JSON.parse(data);

    for (const model of models) {
      await this.modelRepository.save({
        name: model.name,
        modelType: { id: model.model_id }, // relation
      });

      this.logger.log(`Seeded model: ${model.name}`);
    }
  }

  private async seedProjects() {
    const count = await this.projectRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`projects.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(data);

    for (const project of projects) {
      await this.projectRepository.save({
        name_uz: project.name_uz,
        name_ru: project.name_ru,
        name_en: project.name_en,
      });

      this.logger.log(`Seeded project: ${project.name_uz}`);
    }
  }

  private async seedClassifications() {
    const count = await this.classificationRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'classifications.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`classifications.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const classifications = JSON.parse(data);

    for (const classification of classifications) {
      await this.classificationRepository.save({
        name_uz: classification.name_uz,
        name_ru: classification.name_ru,
        name_en: classification.name_en,
      });

      this.logger.log(`Seeded classification: ${classification.name_uz}`);
    }
  }

  private async seedClassificationSocial() {
    const count = await this.classificationSocialRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(
      process.cwd(),
      'data',
      'classifications_social.json',
    );
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`classifications_social.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const records = JSON.parse(data);

    for (const item of records) {
      await this.classificationSocialRepository.save({
        name_uz: item.name_uz,
        name_ru: item.name_ru,
        name_en: item.name_en,
        classification: { id: item.classification_id },
      });

      this.logger.log(`Seeded classifications_social: ${item.name_uz}`);
    }
  }

  private async seedRegions() {
    const count = await this.modelTypeRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'regions.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`regions.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const regions = JSON.parse(data);

    for (const region of regions) {
      await this.regionRepository.save({
        name_uz: region.name_uz,
        name_ru: region.name_uz,
      });
      this.logger.log(`Seeded region: ${region.name_uz}`);
    }
  }

  private async seedDistricts() {
    const count = await this.modelTypeRepository.count();
    if (count) {
      return;
    }
    const filePath = path.join(process.cwd(), 'data', 'districts.json');
    if (!fs.existsSync(filePath)) {
      this.logger.warn(`districts.json not found at ${filePath}`);
      return;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const districts = JSON.parse(data);

    for (const district of districts) {
      await this.districtRepository.save({
        name_uz: district.name_uz,
        name_ru: district.name_uz,
        region: { id: district.region_id },
      });
      this.logger.log(`Seeded district: ${district.name_uz}`);
    }
  }
}
