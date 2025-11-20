import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, IsNull, Repository } from 'typeorm';
import { Etapa } from './etapa.entity';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { Proyecto } from '../proyectos/proyecto.entity';
import { Ong } from '../ongs/ong.entity';
import { Observacion } from 'src/observaciones/observacion.entity';

@Injectable()
export class EtapasService {
  constructor(
    @InjectRepository(Etapa)
    private readonly etapaRepository: Repository<Etapa>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Ong)
    private readonly ongRepository: Repository<Ong>,
  ) {}

  
  async create(createEtapaDto: CreateEtapaDto, requesterOngId?: number): Promise<Etapa> {
    if (createEtapaDto.proyecto_id === null || createEtapaDto.proyecto_id === undefined) {
      throw new BadRequestException('El campo proyecto_id es requerido');
    }
    const proyecto = await this.proyectoRepository.findOne({ where: { id: createEtapaDto.proyecto_id }, relations: ['ong_lider'] });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${createEtapaDto.proyecto_id} no encontrado`);
    }
    if (requesterOngId !== undefined && requesterOngId !== null) {
      if (!proyecto.ong_lider || proyecto.ong_lider.id !== requesterOngId) {
        throw new ForbiddenException('El usuario no pertenece a la ONG líder del proyecto');
      }
    }
    const etapa = this.etapaRepository.create({
      ...createEtapaDto,
      proyecto,
    } as DeepPartial<Etapa>);
    const savedEtapa = await this.etapaRepository.save(etapa);
    return savedEtapa;
  }

  findAll(): Promise<Etapa[]> {
    return this.etapaRepository.find({ relations: ['proyecto', 'ong_ejecutora'] });
  }

  findOne(id: number): Promise<Etapa | null> {
    return this.etapaRepository.findOne({ where: { id }, relations: ['proyecto', 'ong_ejecutora'] });
  }

  async update(id: number, updateEtapaDto: UpdateEtapaDto): Promise<Etapa | null> {
    await this.etapaRepository.update(id, updateEtapaDto);
    return this.findOne(id);
  }

  async findByOngEjecutora(ongId: number): Promise<Etapa[]> {
    if (!ongId) {
      throw new BadRequestException('El usuario no tiene una ONG asociada');
    }

    return this.etapaRepository.find({
      where: { ong_ejecutora: { id: ongId } },
      relations: ['proyecto', 'ong_ejecutora'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.etapaRepository.delete(id);
  }

 async markAsCompleted(id: number, userOngId: number): Promise<Etapa> {
    const etapa = await this.etapaRepository.findOne({ 
      where: { id },
      relations: ['ong_ejecutora']
    });
  
    if (!etapa) {
      throw new NotFoundException(`Etapa con id ${id} no encontrada`);
    }
  
    // Valida que la ONG del usuario sea la ONG ejecutora
    if (etapa.ong_ejecutora.id !== userOngId) {
      throw new UnauthorizedException(
        'Solo la ONG ejecutora puede marcar esta etapa como completada'
      );
    }
  
    // Valida que no esté  completada
    if (etapa.is_completed) {
      throw new BadRequestException('La etapa ya está marcada como completada');
    }
  
    etapa.is_completed = true;
    return await this.etapaRepository.save(etapa);
  }
  
  async commitOng(etapaId: number, ongId: number): Promise<Etapa> {
    const etapa = await this.etapaRepository.findOne({ where: { id: etapaId }, relations: ['ong_ejecutora'] });
    if (!etapa) {
      throw new NotFoundException(`Etapa con id ${etapaId} no encontrada`);
    }

    const ong = await this.ongRepository.findOne({ where: { id: ongId } });
    if (!ong) {
      throw new NotFoundException(`ONG con id ${ongId} no encontrada`);
    }

    if (etapa.ong_ejecutora && etapa.ong_ejecutora.id !== ong.id) {
      throw new ConflictException('La etapa ya tiene una ONG ejecutora asignada');
    }

    etapa.ong_ejecutora = ong;
    return this.etapaRepository.save(etapa);
  }

async findObservacionesByEtapaId(etapaId: number): Promise<Observacion[]> {
  const etapa = await this.etapaRepository.findOne({ 
    where: { id: etapaId }, 
    relations: ['observaciones', 'observaciones.usuario'] 
  });
  return etapa?.observaciones ?? [];
}


async findAvailableEtapas(): Promise<Etapa[]> {
  return this.etapaRepository.find({
    where: { ong_ejecutora: IsNull() },
    relations: ['proyecto', 'ong_ejecutora'],
  });
}




}
