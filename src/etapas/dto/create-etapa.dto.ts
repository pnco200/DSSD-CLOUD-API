import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateEtapaDto {
  @ApiProperty({
    description: 'ID externo de la etapa',
    example: 'ETAPA-001',
    required: false,
  })
  @IsString()
  @IsOptional()
  id_externa: string;

  @ApiProperty({ description: 'Nombre de la etapa', example: 'Inicio' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción de la etapa',
    example: 'Descripción de la etapa inicial',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Indica si la etapa está completada',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_completed: boolean;

  /*@ApiProperty({ description: 'ID de la ONG ejecutora', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ong_ejecutora_id: number;
  */
  @ApiProperty({ description: 'ID del proyecto al que pertenece', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  proyecto_id: number;
}
