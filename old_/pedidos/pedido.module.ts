/*import { Module } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { Etapa } from 'src/etapas/etapa.entity';
import { PedidosController } from './pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Etapa]), // 👈 INCLUIR AMBAS ENTIDADES
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService],
})
export class PedidoModule {}
*/