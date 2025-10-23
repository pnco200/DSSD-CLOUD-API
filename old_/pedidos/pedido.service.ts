/*import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, EstadoPedido } from './pedido.entity';
import { Etapa } from '../etapas/etapa.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    
    @InjectRepository(Etapa)
    private readonly etapaRepo: Repository<Etapa>,
  ) {}

  // Crear pedido recibiendo un objeto simple
  async crear(pedidoData: any) {
    // Validaciones manuales (que antes hacía el DTO)
    if (!pedidoData.titulo || !pedidoData.titulo.trim()) {
      throw new BadRequestException('El título es requerido');
    }

    if (!pedidoData.descripcion || !pedidoData.descripcion.trim()) {
      throw new BadRequestException('La descripción es requerida');
    }

    if (!pedidoData.etapaId) {
      throw new BadRequestException('El ID de etapa es requerido');
    }

    // Verificar que la etapa existe
    const etapa = await this.etapaRepo.findOne({
      where: { id: pedidoData.etapaId },
      relations: ['proyecto']
    });

    if (!etapa) {
      throw new NotFoundException('La etapa especificada no existe');
    }

    const pedido = this.pedidoRepo.create({
      descripcion: pedidoData.descripcion,
      etapaId: pedidoData.etapaId,
      estado: EstadoPedido.PENDIENTE,
    });

    return this.pedidoRepo.save(pedido);
  }

  // Obtener pedidos por proyecto
  async listarPorProyecto(proyectoId: number) {
    const etapas = await this.etapaRepo.find({
      where: { proyectoId },
      relations: ['pedidos', 'pedidos.comprometidoPor']
    });

    const pedidos = etapas.flatMap(etapa => 
      etapa.pedidos.map(pedido => ({
        ...pedido,
        etapa: {
          id: etapa.id,
          nombre: etapa.nombre,
         
        }
      }))
    );

    return pedidos;
  }

  // Obtener pedidos por etapa específica
  listarPorEtapa(etapaId: number) {
    return this.pedidoRepo.find({
      where: { etapaId },
      relations: ['comprometidoPor', 'etapa']
    });
  }

  // Obtener un pedido por ID
  async buscarPorId(id: number) {
    const pedido = await this.pedidoRepo.findOne({ 
      where: { id },
      relations: ['comprometidoPor', 'etapa']
    });
    
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    
    return pedido;
  }

  // Comprometerse con un pedido
  async comprometer(id: number, ongId: number) {
    const pedido = await this.buscarPorId(id);
    
    if (pedido.estado !== EstadoPedido.PENDIENTE) {
      throw new ForbiddenException('El pedido no está disponible para compromiso');
    }

    if (pedido.comprometidoPorId && pedido.comprometidoPorId !== ongId) {
      throw new ForbiddenException('El pedido ya fue comprometido por otra ONG');
    }

    pedido.estado = EstadoPedido.COMPROMETIDO;
    pedido.comprometidoPorId = ongId;
    pedido.fechaComprometido = new Date();

    return this.pedidoRepo.save(pedido);
  }

  // Marcar un pedido como realizado
  async marcarComoRealizado(id: number, ongId: number) {
    const pedido = await this.buscarPorId(id);
    
    if (pedido.comprometidoPorId !== ongId) {
      throw new ForbiddenException('No tienes permiso para marcar este pedido como realizado');
    }

    if (pedido.estado !== EstadoPedido.COMPROMETIDO) {
      throw new ForbiddenException('Solo se pueden marcar como realizados pedidos comprometidos');
    }

    pedido.estado = EstadoPedido.REALIZADO;
    pedido.fechaRealizado = new Date();

    return this.pedidoRepo.save(pedido);
  }

  // Actualizar un pedido existente
  async actualizar(id: number, pedidoData: any) {
    const pedido = await this.buscarPorId(id);
    
    // Validar que no se intenten modificar campos protegidos
    const camposPermitidos = ['titulo', 'descripcion'];
    const datosActualizados = {};
    
    for (const campo of camposPermitidos) {
      if (pedidoData[campo] !== undefined) {
        datosActualizados[campo] = pedidoData[campo];
      }
    }
    
    this.pedidoRepo.merge(pedido, datosActualizados);
    return this.pedidoRepo.save(pedido);
  }

  // Eliminar un pedido
  async eliminar(id: number) {
    const pedido = await this.buscarPorId(id);
    return this.pedidoRepo.remove(pedido);
  }

  // Obtener pedidos por estado
  listarPorEstado(estado: EstadoPedido, proyectoId?: number) {
    const where: any = { estado };
    if (proyectoId) {
      where.etapa = { proyectoId }; // Relación indirecta
    }
    
    return this.pedidoRepo.find({ 
      where,
      relations: ['comprometidoPor', 'etapa']
    });
  }

  // Obtener pedidos comprometidos por una ONG específica
  listarComprometidosPorOng(ongId: number) {
    return this.pedidoRepo.find({
      where: { 
        comprometidoPorId: ongId,
        estado: EstadoPedido.COMPROMETIDO
      },
      relations: ['etapa', 'etapa.proyecto']
    });
  }
}*/