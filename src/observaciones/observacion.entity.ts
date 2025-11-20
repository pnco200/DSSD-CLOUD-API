import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Etapa } from '../etapas/etapa.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('Observaciones')
export class Observacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  comentario: string;

  @Column({ default: false })
  respondida: boolean;
  
  @Column({ nullable: true })
  respuesta: string; 
  
  @CreateDateColumn()
  fechaObservacion: Date;

  @Column()
  fechaFinObservacion: Date;

  @ManyToOne(() => Etapa, etapa => etapa.observaciones, { nullable: false })
  etapa: Etapa;

  @ManyToOne(() => Usuario, usuario => usuario.observaciones, { nullable: false })
  usuario: Usuario;
}