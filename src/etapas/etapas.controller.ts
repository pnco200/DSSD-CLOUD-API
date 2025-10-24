import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Etapa } from './etapa.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('etapas')
@Controller('etapas')
export class EtapasController {
  constructor(private readonly etapasService: EtapasService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Crear una nueva etapa' })
  @ApiResponse({ status: 201, description: 'La etapa fue creada exitosamente', type: Etapa })
  create(@Body() createEtapaDto: CreateEtapaDto, @Request() req) {
    return this.etapasService.create(createEtapaDto, req.user.ong_id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las etapas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las etapas obtenida exitosamente.', type: [Etapa] })
  findAll() {
    return this.etapasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener etapa por ID' })
  @ApiResponse({ status: 200, description: 'Etapa encontrada exitosamente.', type: Etapa })
  findOne(@Param('id') id: string) {
    return this.etapasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar etapa' })
  @ApiResponse({ status: 200, description: 'La etapa fue actualizada exitosamente.', type: Etapa })
  update(@Param('id') id: string, @Body() updateEtapaDto: UpdateEtapaDto) {
    return this.etapasService.update(+id, updateEtapaDto);
  }
  
  @Patch(':id/complete')
  @ApiOperation({ summary: 'Marcar etapa como completada' })
  @ApiResponse({ status: 200, description: 'La etapa fue marcada como completada exitosamente!', type: Etapa })
  markAsCompleted(@Param('id') id: string) {
    return this.etapasService.markAsCompleted(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id/comprometer')
  @ApiOperation({ summary: 'Comprometer una ONG para ejecutar la etapa' })
  @ApiResponse({ status: 200, description: 'La ONG fue comprometida a la etapa exitosamente.', type: Etapa })
  commitOng(@Param('id') id: string, @Request() req) {
    return this.etapasService.commitOng(+id, req.user.ong_id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar etapa' })
  @ApiResponse({ status: 204, description: 'La etapa fue eliminada exitosamente' })
  remove(@Param('id') id: string) {
    return this.etapasService.remove(+id);
  }
}
