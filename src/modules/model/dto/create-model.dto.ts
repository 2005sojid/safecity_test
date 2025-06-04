import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  model_id: number;
}
