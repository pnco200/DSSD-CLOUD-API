import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateObservacionDto {
  @ApiProperty({ description: 'Título de la observación', example: 'Título ejemplo' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Comentario de la observación', example: 'Comentario ejemplo' })
  @IsString()
  @IsNotEmpty()
  comentario: string;

  

}
