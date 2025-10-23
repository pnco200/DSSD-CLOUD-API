import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Ong } from '../ongs/ong.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Ong)
    private readonly ongRepository: Repository<Ong>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const ong_lider = await this.ongRepository.findOne({ where: { id: createProyectoDto.ong_lider_id } });
    const proyecto = this.proyectoRepository.create({
      ...createProyectoDto,
      ong_lider,
    } as DeepPartial<Proyecto>);
    return this.proyectoRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    return this.proyectoRepository.find({ relations: ['ong_lider', 'etapas'] });
  }

  findOne(id: number): Promise<Proyecto | null> {
    return this.proyectoRepository.findOne({ where: { id }, relations: ['ong_lider', 'etapas'] });
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto | null> {
    await this.proyectoRepository.update(id, updateProyectoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.proyectoRepository.delete(id);
  }
}
