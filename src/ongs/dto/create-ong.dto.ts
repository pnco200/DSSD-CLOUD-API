import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOngDto {
  @ApiProperty({
    description: 'Nombre de la ONG',
    example: 'Techo',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
