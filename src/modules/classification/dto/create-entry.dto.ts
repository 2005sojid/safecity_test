import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassificationEntryDto {
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;
}