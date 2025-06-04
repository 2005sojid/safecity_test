import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { OrderEntity } from '../../entities/order.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.update(+id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.projectService.delete(+id);
  }

  @Get(':id/orders')
  findAllOrders(@Param('id') id: string): Promise<OrderEntity[]> {
    return this.projectService.findAllOrders(+id);
  }
}
