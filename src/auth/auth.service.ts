import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      sub: user.id,
      username: user.username,
      es_gerente: user.es_gerente,
      ong_nombre: user.ong.nombre,
      ong_id: user.ong.id,
    };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
