import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;
}
