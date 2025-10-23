import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuarios/usuario.entity';
import { Etapa } from './etapas/etapa.entity';
import { Ong } from './ongs/ong.entity';
import { Proyecto } from './proyectos/proyecto.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: [Usuario, Etapa, Ong, Proyecto],
  synchronize: true, // Set to true to auto-create tables
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('DB connected for seeding');

  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const ongRepo = AppDataSource.getRepository(Ong);
  const proyectoRepo = AppDataSource.getRepository(Proyecto);
  const etapaRepo = AppDataSource.getRepository(Etapa);

  // Clear existing data
  await etapaRepo.clear();
  await proyectoRepo.clear();
  await ongRepo.clear();
  await usuarioRepo.clear();

  // Seed Usuarios
  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await usuarioRepo.save(usuarioRepo.create({ username: 'admin', password: passwordHash, rol: 'admin' }));
  const user1 = await usuarioRepo.save(usuarioRepo.create({ username: 'user1', password: passwordHash, rol: 'user' }));

  // Seed ONGs
  const ong1 = await ongRepo.save(ongRepo.create({ nombre: 'ONG A' }));
  const ong2 = await ongRepo.save(ongRepo.create({ nombre: 'ONG B' }));

  // Seed Proyectos
  const proyecto1 = await proyectoRepo.save(proyectoRepo.create({
    nombre: 'Proyecto Alpha',
    descripcion: 'Descripción del Proyecto Alpha',
    ong_lider: ong1,
    fecha_inicio: new Date('2023-01-15'),
    en_ejecucion: true,
  }));

  // Seed Etapas
  await etapaRepo.save(etapaRepo.create({
    nombre: 'Etapa 1 de Alpha',
    descripcion: 'Primera etapa del Proyecto Alpha',
    proyecto: proyecto1,
    ong_ejecutora: ong2,
    is_completed: false,
  }));

  await etapaRepo.save(etapaRepo.create({
    nombre: 'Etapa 2 de Alpha',
    descripcion: 'Segunda etapa del Proyecto Alpha',
    proyecto: proyecto1,
    ong_ejecutora: ong1,
    is_completed: false,
  }));

  console.log('Seed completed');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error', err);
  process.exit(1);
});