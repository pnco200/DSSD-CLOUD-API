import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('etapas')
@UseGuards(JwtAuthGuard)
export class EtapasController {
  constructor(private readonly etapasService: EtapasService) {}

  @Post()
  crear(@Body() body: { nombre: string; descripcion: string; proyectoId: number }) {
    return this.etapasService.crear(body);
  }

  @Get(':proyectoId')
  listar(@Param('proyectoId') proyectoId: number) {
    return this.etapasService.listarPorProyecto(proyectoId);
  }

  @Patch(':id/estado')
  actualizarEstado(
    @Param('id') id: number,
    @Body() body: { estado: string },
  ) {
    return this.etapasService.actualizarEstado(id, body.estado);
  }
}
