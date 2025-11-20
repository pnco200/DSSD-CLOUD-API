import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { ObservacionService } from './observacion.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Observacion } from './observacion.entity';

@ApiTags('Observaciones')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('observaciones')
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) {}

  @Post(':etapaId')
  @ApiOperation({ summary: 'Crear una nueva observación' })
  @ApiResponse({ status: 201, description: 'Observación creada', type: Observacion })
  @ApiResponse({ status: 404, description: 'Etapa no encontrada' })
  create( 
  @Param('etapaId') etapaId: number,  // Parámetro de la etapa
  @Body() dto: CreateObservacionDto,  // Datos de la observación
  @Request() req ) {
    
    return this.observacionService.create(etapaId,dto,req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las observaciones' })
  @ApiResponse({ status: 200, description: 'Lista de observaciones', type: [Observacion] })
  findAll() {
    return this.observacionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una observación por ID' })
  @ApiResponse({ status: 200, description: 'Observación encontrada', type: Observacion })
  findOne(@Param('id') id: number) {
    return this.observacionService.findOne(+id);
  }

  @Patch(':id/responder')
  @ApiOperation({ summary: 'Responder una observación' })
  @ApiResponse({ status: 200, description: 'Observación respondida correctamente', type: Observacion })
  @ApiResponse({ status: 400, description: 'La observación ya fue respondida' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para responder esta observación' })
  responderObservacion(
    @Param('id') id: number,
    @Body() dto: UpdateObservacionDto,
    @Request() req,
  ) {
    const userOngId = req.user.ong_id;
    return this.observacionService.responderObservacion(id, dto, userOngId);
  } 



}
