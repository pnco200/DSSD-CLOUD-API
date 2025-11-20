import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Ong } from '../ongs/ong.entity';
import { Observacion } from 'src/observaciones/observacion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false }) // Valor por defecto: false
  es_gerente: boolean;

  @ManyToOne(() => Ong, { eager: true })
  @JoinColumn({ name: 'ong_id' })
  ong: Ong;

  @OneToMany(() => Observacion, observacion => observacion.usuario)
  observaciones: Observacion[];
}
