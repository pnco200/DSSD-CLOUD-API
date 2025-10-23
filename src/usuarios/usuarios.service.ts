import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);
    const newUser = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return this.usuarioRepository.save(newUser);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new Error(`Usuario with ID ${id} not found`);
    }
    return usuario;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if (updateUsuarioDto.password) {
      const salt = await bcrypt.genSalt();
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, salt);
    }
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new Error(`Usuario with ID ${id} not found`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}