import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etapa } from './etapa.entity';

@Injectable()
export class EtapasService {
  constructor(
    @InjectRepository(Etapa)
    private readonly etapaRepo: Repository<Etapa>,
  ) {}

  crear(etapaData: Partial<Etapa>) {
    const etapa = this.etapaRepo.create(etapaData);
    return this.etapaRepo.save(etapa);
  }

  listarPorProyecto(proyectoId: number) {
    return this.etapaRepo.find({ where: { proyectoId } });
  }

  async actualizarEstado(id: number, nuevoEstado: string) {
    const etapa = await this.etapaRepo.findOne({ where: { id } });
    if (!etapa) throw new Error('Etapa no encontrada');
    etapa.estado = nuevoEstado;
    return this.etapaRepo.save(etapa);
  }
}
