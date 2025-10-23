import { IsString, IsNotEmpty, IsDateString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsOptional()
  id_externa: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  ong_lider_id: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @IsDateString()
  @IsOptional()
  fecha_fin: Date;

  @IsBoolean()
  @IsOptional()
  en_ejecucion: boolean;
}
