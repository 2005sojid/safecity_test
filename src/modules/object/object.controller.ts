import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe, Query,
} from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectEntity } from '../../entities/object.entity';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ObjectFilters } from '../../filters.interface';
import { ApiTags } from '@nestjs/swagger';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Authorization()
@ApiTags('Objects')
@Controller('objects')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Get()
  getAll(@Query() filters: ObjectFilters): Promise<ObjectEntity[]> {
    return this.objectService.findAll(filters);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<ObjectEntity> {
    return this.objectService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateObjectDto): Promise<ObjectEntity> {
    return this.objectService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateObjectDto,
  ): Promise<ObjectEntity> {
    return this.objectService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.objectService.delete(id);
  }
}
