import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ong } from '../ongs/ong.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  rol: string;

  @ManyToOne(() => Ong, { eager: true })
  @JoinColumn({ name: 'ong_id' })
  ong: Ong;
}
