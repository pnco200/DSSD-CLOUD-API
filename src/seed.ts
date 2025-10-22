import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuarios/usuario.entity';
import { Etapa } from './etapas/etapa.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: [Usuario, Etapa],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('DB connected for seeding');

  const usuarioRepo = AppDataSource.getRepository(Usuario);
  const etapaRepo = AppDataSource.getRepository(Etapa);

  // Clear existing data (careful in production)
  await etapaRepo.clear();
  await usuarioRepo.clear();

  const passwordHash = await bcrypt.hash('password123', 10);

  const usuarios = [
    usuarioRepo.create({ username: 'admin', password: passwordHash, rol: 'admin' }),
    usuarioRepo.create({ username: 'user1', password: passwordHash, rol: 'user' }),
  ];

  await usuarioRepo.save(usuarios);

  const etapas = [
    etapaRepo.create({ nombre: 'Planificación', descripcion: 'Definir alcance', proyectoId: 1, estado: 'pendiente' }),
    etapaRepo.create({ nombre: 'Desarrollo', descripcion: 'Implementar features', proyectoId: 1, estado: 'en progreso' }),
  ];

  await etapaRepo.save(etapas);

  console.log('Seed completed: inserted', usuarios.length, 'usuarios and', etapas.length, 'etapas');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error', err);
  process.exit(1);
});
