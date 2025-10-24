import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({
    description: 'ID externo del proyecto',
    example: 'PROY-001',
    required: false,
  })
  @IsString()
  @IsOptional()
  id_externa: string;

  @ApiProperty({
    description: 'Nombre del proyecto',
    example: 'Construcción de viviendas',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del proyecto',
    example: 'Construcción de 10 viviendas para familias de bajos recursos',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Fecha de inicio del proyecto',
    example: '2024-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @ApiProperty({
    description: 'Fecha de fin del proyecto',
    example: '2024-12-31',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fecha_fin: Date;

  @ApiProperty({
    description: 'Indica si el proyecto está en ejecución',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  en_ejecucion: boolean;
}
