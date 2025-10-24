import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommitEtapaDto {
  @ApiProperty({ description: 'ID de la ONG que se compromete a ejecutar la etapa', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ong_id: number;
}

