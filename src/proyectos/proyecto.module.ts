import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Ong } from '../ongs/ong.entity';
import { OngModule } from '../ongs/ong.module';
import { EtapasModule } from 'src/etapas/etapas.module';
import { Etapa } from 'src/etapas/etapa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Ong, Etapa]), OngModule],
  providers: [ProyectoService],
  controllers: [ProyectoController],
  exports: [ProyectoService],
})
export class ProyectoModule {}
