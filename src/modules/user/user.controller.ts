import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user.entity';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { ApiTags } from '@nestjs/swagger';

@Authorization()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(+id);
  }
}
