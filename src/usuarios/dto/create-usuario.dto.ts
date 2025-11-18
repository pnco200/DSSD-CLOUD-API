import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Email del usuario', example: 'john@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'Indica si el usuario es gerente', 
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  es_gerente: boolean;

  @ApiProperty({ description: 'ID de la ONG a la que pertenece el usuario', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ong_id: number;
}
