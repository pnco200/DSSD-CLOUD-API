import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Proyecto } from './proyecto.entity';
import { Etapa } from '../etapas/etapa.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('proyectos')
@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'El proyecto ha sido creado exitosamente.', type: Proyecto })
  create(@Body() createProyectoDto: CreateProyectoDto, @Request() req) {
    
    return this.proyectoService.create(createProyectoDto, req.user.ong_id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de todos los proyectos obtenida exitosamente.', type: [Proyecto] })
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado exitosamente.', type: Proyecto })
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiResponse({ status: 200, description: 'El proyecto ha sido actualizado exitosamente.', type: Proyecto })
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(+id, updateProyectoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({ status: 204, description: 'El proyecto ha sido eliminado exitosamente.' })
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }

  @Get(':id/etapas')
  @ApiOperation({ summary: 'Obtener todas las etapas de un proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de etapas del proyecto obtenida exitosamente.', type: [Etapa] })
  findEtapas(@Param('id') id: string) {
    return this.proyectoService.findEtapas(+id);
  }
}
