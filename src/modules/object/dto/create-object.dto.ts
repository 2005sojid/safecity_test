import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateObjectDto {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsNumber()
  speed: number;

  @IsString()
  @IsNotEmpty()
  speedUnit: string;

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  connectionType: string;

  @IsNumber()
  region_id: number;

  @IsNumber()
  district_id: number;

  @IsNumber()
  project_id: number;

  @IsNumber()
  order_id: number;

  @IsNumber()
  classification_id: number;

  @IsNumber()
  classification_entry_id: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
