import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Authorization()
@ApiTags('Districts')
@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateDistrictDto) {
    return this.districtService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDistrictDto) {
    return this.districtService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.districtService.delete(+id);
  }
}
