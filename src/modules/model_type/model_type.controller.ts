import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ModelTypeService } from './model_type.service';
import { CreateModelTypeDto } from './dto/create-model-type.dto';
import { UpdateModelTypeDto } from './dto/update-model-type.dto';

@Controller('model-types')
export class ModelTypeController {
  constructor(private readonly service: ModelTypeService) {}

  @Post()
  create(@Body() dto: CreateModelTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModelTypeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/models')
  findAllModels(@Param('id', ParseIntPipe) id: number) {
    return this.service.findAllModels(id);
  }
}
