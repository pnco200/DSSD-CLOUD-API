import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observacion } from './observacion.entity';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { Etapa } from '../etapas/etapa.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class ObservacionService {
  constructor(
    @InjectRepository(Observacion)
    private readonly observacionRepo: Repository<Observacion>,
    @InjectRepository(Etapa)
    private readonly etapaRepo: Repository<Etapa>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(etapaId, dto: CreateObservacionDto, user: any): Promise<Observacion> {
    const etapa = await this.etapaRepo.findOne({ where: { id: etapaId } });
    const usuario = await this.usuarioRepo.findOne({ where: { id: user.sub } });

    if (!etapa) throw new NotFoundException('Etapa no encontrada');
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const observacion = this.observacionRepo.create({
      titulo: dto.titulo,
      comentario: dto.comentario,
      respondida: false,
      fechaFinObservacion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // +5 días
      etapa,
      usuario,
    });

    return this.observacionRepo.save(observacion);
  }

  findAll(): Promise<Observacion[]> {
    return this.observacionRepo.find({ relations: ['etapa', 'usuario'] });
  }

  async findOne(id: number): Promise<Observacion> {
    const obs = await this.observacionRepo.findOne({ where: { id }, relations: ['etapa', 'usuario'] });
    if (!obs) throw new NotFoundException('Observación no encontrada');
    return obs;
  }

  async responderObservacion(id: number, dto: UpdateObservacionDto, userOngId: any) {
    const obs = await this.observacionRepo.findOne({
        where: { id },
        relations: ['etapa', 'etapa.ong_ejecutora'],
    });

    if (!obs) throw new NotFoundException('Observación no encontrada');

    if (obs.respondida)
        throw new BadRequestException('La observación ya fue respondida');

    if (userOngId !== obs.etapa.ong_ejecutora.id) {
        throw new ForbiddenException(
        'No tiene permiso para responder esta observación'
        );
    }
    if (dto.respuesta) {
        obs.respuesta = dto.respuesta;
    }
    obs.respondida = true;  
    return await this.observacionRepo.save(obs);
    }
}