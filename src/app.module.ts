import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EtapasModule } from './etapas/etapas.module';
import { OngModule } from './ongs/ong.module';
import { ProyectoModule } from './proyectos/proyecto.module';
import { ObservacionModule } from './observaciones/observacion.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,

      //  Render requiere SSL, pero mantenemos compatibilidad local
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
    AuthModule,
    UsuariosModule,
    EtapasModule,
    OngModule,
    ProyectoModule,
    ObservacionModule
  ],
})
export class AppModule {}
