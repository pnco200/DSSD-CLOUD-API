import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('etapas')
export class Etapa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  proyectoId: number;

  @Column({ default: 'pendiente' })
  estado: string;
}
