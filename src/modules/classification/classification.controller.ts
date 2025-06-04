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
import { ClassificationService } from './classification.service';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { CreateClassificationEntryDto } from './dto/create-entry.dto';

@Controller('classifications')
export class ClassificationController {
  constructor(private readonly service: ClassificationService) {}

  @Post()
  create(@Body() dto: CreateClassificationDto) {
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
    @Body() dto: UpdateClassificationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/entries')
  findAllEntries(@Param('id', ParseIntPipe) id: number) {
    return this.service.findAllEntries(id);
  }

  @Post(':id/entries')
  createEntry(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateClassificationEntryDto,
  ) {
    return this.service.createEntry(id, dto);
  }
}
