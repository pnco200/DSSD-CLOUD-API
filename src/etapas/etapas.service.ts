import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Etapa } from './etapa.entity';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { Proyecto } from '../proyectos/proyecto.entity';
import { Ong } from '../ongs/ong.entity';

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

  
  async create(createEtapaDto: CreateEtapaDto): Promise<Etapa> {
    if (createEtapaDto.proyecto_id === null || createEtapaDto.proyecto_id === undefined) {
      throw new BadRequestException('El campo proyecto_id es requerido');
    }
    const proyecto = await this.proyectoRepository.findOne({ where: { id: createEtapaDto.proyecto_id } });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${createEtapaDto.proyecto_id} no encontrado`);
    }
    //const ong_ejecutora = await this.ongRepository.findOne({ where: { id: createEtapaDto.ong_ejecutora_id } });
    const etapa = this.etapaRepository.create({
      ...createEtapaDto,
      proyecto,
      //ong_ejecutora,
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

  async remove(id: number): Promise<void> {
    await this.etapaRepository.delete(id);
  }

 async markAsCompleted(id: number): Promise<Etapa> {
      const etapa = await this.etapaRepository.findOne({ where: { id } });
      
      if (!etapa) {
        throw new Error(`Etapa with id ${id} not found`);
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
}
