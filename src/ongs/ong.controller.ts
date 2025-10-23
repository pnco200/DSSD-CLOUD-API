import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OngService } from './ong.service';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Ong } from './ong.entity';

@ApiTags('ongs')
@Controller('ongs')
export class OngController {
  constructor(private readonly ongService: OngService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ONG' })
  @ApiResponse({ status: 201, description: 'La ONG ha sido creada exitosamente.', type: Ong })
  create(@Body() createOngDto: CreateOngDto) {
    return this.ongService.create(createOngDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ONGs' })
  @ApiResponse({ status: 200, description: 'Lista de todas las ONGs obtenida exitosamente.', type: [Ong] })
  findAll() {
    return this.ongService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ONG por ID' })
  @ApiResponse({ status: 200, description: 'ONG encontrada exitosamente.', type: Ong })
  findOne(@Param('id') id: string) {
    return this.ongService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ONG' })
  @ApiResponse({ status: 200, description: 'La ONG ha sido actualizada exitosamente.', type: Ong })
  update(@Param('id') id: string, @Body() updateOngDto: UpdateOngDto) {
    return this.ongService.update(+id, updateOngDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ONG' })
  @ApiResponse({ status: 204, description: 'La ONG ha sido eliminada exitosamente.' })
  remove(@Param('id') id: string) {
    return this.ongService.remove(+id);
  }
}
