import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Ong } from '../ongs/ong.entity';
import { OngModule } from '../ongs/ong.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Ong]), OngModule],
  providers: [ProyectoService],
  controllers: [ProyectoController],
  exports: [ProyectoService],
})
export class ProyectoModule {}
