import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etapa } from './etapa.entity';
import { EtapasService } from './etapas.service';
import { EtapasController } from './etapas.controller';
import { Proyecto } from '../proyectos/proyecto.entity';
import { Ong } from '../ongs/ong.entity';
import { ProyectoModule } from '../proyectos/proyecto.module';
import { OngModule } from '../ongs/ong.module';

@Module({
  imports: [TypeOrmModule.forFeature([Etapa, Proyecto, Ong]), ProyectoModule, OngModule],
  providers: [EtapasService],
  controllers: [EtapasController],
  exports: [EtapasService],
})
export class EtapasModule {}