import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class UpdateObservacionDto {
  

  @ApiProperty({ description: 'Respuesta a la observación', example: 'Respuesta ejemplo', required: false })
  @IsString()
  respuesta?: string;


  
}
