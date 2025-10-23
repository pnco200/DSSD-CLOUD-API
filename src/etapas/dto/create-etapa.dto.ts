import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateEtapaDto {
  @IsString()
  @IsOptional()
  id_externa: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  is_completed: boolean;

  @IsNumber()
  @IsNotEmpty()
  ong_ejecutora_id: number;

  @IsNumber()
  @IsNotEmpty()
  proyecto_id: number;
}
