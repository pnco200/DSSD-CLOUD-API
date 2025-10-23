import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Ong } from '../ongs/ong.entity';
import { Etapa } from '../etapas/etapa.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_externa: string;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @ManyToOne(() => Ong, { eager: true })
  ong_lider: Ong;

  @Column('date')
  fecha_inicio: Date;

  @Column('date', { nullable: true })
  fecha_fin: Date;

  @Column({ default: false })
  en_ejecucion: boolean;

  @OneToMany(() => Etapa, etapa => etapa.proyecto)
  etapas: Etapa[];
}