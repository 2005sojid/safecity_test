import { IsString } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  name_uz?: string;

  @IsString()
  name_ru?: string;
}
