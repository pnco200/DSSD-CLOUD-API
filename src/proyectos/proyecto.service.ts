import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Ong } from '../ongs/ong.entity';
import { Etapa } from '../etapas/etapa.entity';
import { CreateEtapaDto } from 'src/etapas/dto/create-etapa.dto';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,

    @InjectRepository(Ong)
    private readonly ongRepository: Repository<Ong>,

    @InjectRepository(Etapa)
    private readonly etapaRepository: Repository<Etapa>,
  ) {}

  async createAll(createProyectoDto: any, ong_id: number): Promise<Proyecto> {
    const ong_lider = await this.ongRepository.findOne({ where: { id: ong_id } });
    if (!ong_lider) {
      throw new NotFoundException(`ONG con id ${ong_id} no encontrada`);
    }

    const proyecto = await this.proyectoRepository.save({
      id_externa: createProyectoDto.id_proyecto,
      ...createProyectoDto,
      ong_lider,
    });

    for (const etapaDto of createProyectoDto.etapas) {
      const aux: CreateEtapaDto = {
        id_externa: etapaDto.id_etapa,
        descripcion: etapaDto.descripcion,
        nombre: etapaDto.nombre,
        is_completed: false,
        proyecto_id: proyecto.id,
      };

      const etapa = this.etapaRepository.create({
        ...aux,
        proyecto,
      } as DeepPartial<Etapa>);

      await this.etapaRepository.save(etapa);
    }

    return proyecto;
  }

  async create(createProyectoDto: CreateProyectoDto, ong_id: number): Promise<Proyecto> {
    const ong_lider = await this.ongRepository.findOne({ where: { id: ong_id } });
    if (!ong_lider) {
      throw new NotFoundException(`ONG con id ${ong_id} no encontrada`);
    }

    const proyecto = this.proyectoRepository.create({
      id_externa: createProyectoDto.id_proyecto,
      ...createProyectoDto,
      ong_lider,
    });

    return this.proyectoRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    return this.proyectoRepository.find({
      relations: ['ong_lider', 'etapas'],
    });
  }

  findOne(id: number): Promise<Proyecto | null> {
    return this.proyectoRepository.findOne({
      where: { id }
    });
  }

  async updateCompletado(id: number): Promise<Proyecto | null> {
    const proyecto = await this.findOne(id)
    if(!proyecto) return null;
    proyecto.en_ejecucion = true;
    await this.proyectoRepository.update(id, proyecto);
    return proyecto
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto | null> {
    await this.proyectoRepository.update(id, updateProyectoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.proyectoRepository.delete(id);
  }

  async findEtapas(id: number): Promise<Etapa[]> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['etapas'],
    });
    return proyecto?.etapas ?? [];
  }
}
