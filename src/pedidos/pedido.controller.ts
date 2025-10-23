import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('pedidos') // 👈 Agrupa endpoints bajo "pedidos" en Swagger
@ApiBearerAuth() // 👈 Indica que requiere autenticación JWT
@Controller('pedidos')
@UseGuards(JwtAuthGuard)
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @ApiOperation({ summary: 'Crear un nuevo pedido de colaboración' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'Recolección de materiales' },
        descripcion: { type: 'string', example: 'Necesitamos recolectar materiales de construcción' },
        etapaId: { type: 'number', example: 5 },
        prioridad: { type: 'number', example: 2, default: 1 },
        fechaLimite: { type: 'string', format: 'date-time', example: '2024-12-31' }
      },
      required: ['titulo', 'descripcion', 'etapaId']
    }
  })
  @Post()
  crearPedido(@Body() body: any) {  
    return this.pedidosService.crear(body);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener todos los pedidos de un proyecto' })
  @ApiParam({ name: 'proyectoId', type: 'number', description: 'ID del proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del proyecto' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @Get('proyecto/:proyectoId')
  listarPorProyecto(@Param('proyectoId') proyectoId: number) {
    return this.pedidosService.listarPorProyecto(proyectoId);
  }

  @Get('etapa/:etapaId')
  listarPorEtapa(@Param('etapaId') etapaId: number) {
    return this.pedidosService.listarPorEtapa(etapaId);
  }

  @Get(':id')
  buscarPedido(@Param('id') id: number) {
    return this.pedidosService.buscarPorId(id);
  }

  @Put(':id/comprometer')
  comprometerPedido(@Param('id') id: number, @Request() req) {
    const ongId = req.user.ongId;
    return this.pedidosService.comprometer(id, ongId);
  }

  @Put(':id/realizar')
  @ApiOperation({ summary: 'Marcar un pedido como realizado' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido marcado como realizado' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para esta acción' })
  marcarComoRealizado(@Param('id') id: number, @Request() req) {
    const ongId = req.user.ongId;
    return this.pedidosService.marcarComoRealizado(id, ongId);
  }

  @Put(':id')
  actualizarPedido(@Param('id') id: number, @Body() body: any) {
    return this.pedidosService.actualizar(id, body);
  }

  @Delete(':id')
  eliminarPedido(@Param('id') id: number) {
    return this.pedidosService.eliminar(id);
  }

  @Get()
  listarPedidos(
    @Query('estado') estado: string,
    @Query('proyectoId') proyectoId: number
  ) {
    return this.pedidosService.listarPorEstado(estado as any, proyectoId);
  }

  @Get('ong/mis-compromisos')
  listarMisCompromisos(@Request() req) {
    const ongId = req.user.ongId;
    return this.pedidosService.listarComprometidosPorOng(ongId);
  }
}