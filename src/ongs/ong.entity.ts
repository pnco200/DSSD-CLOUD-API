import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ongs')
export class Ong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;
}