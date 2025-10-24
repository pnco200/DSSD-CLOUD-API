import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'user',
    required: false,
  })
  @IsString()
  @IsOptional()
  rol: string;

  @ApiProperty({ description: 'ID de la ONG a la que pertenece el usuario', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ong_id: number;
}
