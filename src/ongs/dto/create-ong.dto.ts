import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOngDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
