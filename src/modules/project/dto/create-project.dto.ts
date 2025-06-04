import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name_uz: string;

  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @IsNotEmpty()
  @IsString()
  name_en: string;
}
