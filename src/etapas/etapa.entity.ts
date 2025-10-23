import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';
import { Ong } from '../ongs/ong.entity';

@Entity('etapas')
export class Etapa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_externa: string;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ default: false })
  is_completed: boolean;

  @ManyToOne(() => Ong, { eager: true })
  ong_ejecutora: Ong;

  @ManyToOne(() => Proyecto, proyecto => proyecto.etapas)
  proyecto: Proyecto;
}