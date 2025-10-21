import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etapa } from './etapa.entity';
import { EtapasService } from './etapas.service';
import { EtapasController } from './etapas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Etapa])],
  controllers: [EtapasController],
  providers: [EtapasService],
  exports: [EtapasService],
})
export class EtapasModule {}
