import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModelTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
