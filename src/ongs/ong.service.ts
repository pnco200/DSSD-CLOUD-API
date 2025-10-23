import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ong } from './ong.entity';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';

@Injectable()
export class OngService {
  constructor(
    @InjectRepository(Ong)
    private readonly ongRepository: Repository<Ong>,
  ) {}

  create(createOngDto: CreateOngDto): Promise<Ong> {
    const ong = this.ongRepository.create(createOngDto);
    return this.ongRepository.save(ong);
  }

  findAll(): Promise<Ong[]> {
    return this.ongRepository.find();
  }

  findOne(id: number): Promise<Ong | null>{
    return this.ongRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOngDto: UpdateOngDto): Promise<Ong | null> {
    await this.ongRepository.update(id, updateOngDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ongRepository.delete(id);
  }
}
