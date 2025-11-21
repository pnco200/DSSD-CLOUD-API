import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './observacion.entity';
import { ObservacionService } from './observacion.service';
import { ObservacionController } from './observacion.controller';
import { Etapa } from 'src/etapas/etapa.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { MailService } from 'src/common/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion, Etapa, Usuario])],
    controllers: [ObservacionController],
  providers: [ObservacionService, MailService],
  exports: [ObservacionService],
})
export class ObservacionModule {}
