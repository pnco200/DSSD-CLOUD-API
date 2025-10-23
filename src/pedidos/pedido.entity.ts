// pedidos/pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Etapa } from '../etapas/etapa.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
//import { Ong } from '../ongs/ong.entity';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  COMPROMETIDO = 'comprometido',
  REALIZADO = 'realizado',
  CANCELADO = 'cancelado'
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ 
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE
  })
  estado: EstadoPedido;

  // 👇 RELACIÓN MODIFICADA: Ahora el pedido pertenece a una etapa
  @Column()
  etapaId: number;

  @Column({ nullable: true })
  comprometidoPorId: number;

  @Column({ type: 'timestamp', nullable: true })
  fechaComprometido: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaRealizado: Date;

  @CreateDateColumn()
  fechaCreacion: Date;

  // Relación: Un pedido pertenece a una etapa
  @ManyToOne(() => Etapa, etapa => etapa.pedidos)
  @JoinColumn({ name: 'etapaId' })
  etapa: Etapa;

  // Relación: Un pedido puede ser comprometido por una ONG
  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'comprometidoPorId' })
  comprometidoPor: Usuario;
}


