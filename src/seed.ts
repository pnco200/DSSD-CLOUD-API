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
  await AppDataSource.query(`
    TRUNCATE TABLE "etapas", "proyectos", "usuarios", "ongs" 
    RESTART IDENTITY CASCADE
  `);

  // Seed ONGs
  const ongLider = await ongRepo.save(ongRepo.create({ 
    nombre: 'ONG Líder' 
  }));
  
  const ongColaboradora = await ongRepo.save(ongRepo.create({ 
    nombre: 'ONG Colaboradora' 
  }));

  // Seed Usuarios
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // Usuarios para ONG Líder
  const laura = await usuarioRepo.save(usuarioRepo.create({ 
    username: 'laura.fernandez', 
    password: passwordHash, 
    email: 'laura.fernandez@onglider.org',
    ong: ongLider,
    es_gerente: true 
  }));

  const pedro = await usuarioRepo.save(usuarioRepo.create({ 
    username: 'pedro.rodriguez', 
    password: passwordHash, 
    email: 'pedro.rodriguez@onglider.org',
    ong: ongLider,
    es_gerente: false 
  }));

  const roberto = await usuarioRepo.save(usuarioRepo.create({ 
    username: 'roberto.silva', 
    password: passwordHash, 
    email: 'roberto.silva@onglider.org',
    ong: ongLider,
    es_gerente: true 
  }));

  // Usuarios para ONG Colaboradora
  const carlos = await usuarioRepo.save(usuarioRepo.create({ 
    username: 'carlos.mendoza', 
    password: passwordHash, 
    email: 'carlos.mendoza@ongcolaboradora.org',
    ong: ongColaboradora,
    es_gerente: true 
  }));

  const sofia = await usuarioRepo.save(usuarioRepo.create({ 
    username: 'sofia.gutierrez', 
    password: passwordHash, 
    email: 'sofia.gutierrez@ongcolaboradora.org',
    ong: ongColaboradora,
    es_gerente: false 
  }));

  // Seed Proyectos
  const proyectoEducacion = await proyectoRepo.save(proyectoRepo.create({
    nombre: 'Proyecto Educación Rural',
    descripcion: 'Programa de alfabetización en zonas rurales',
    ong_lider: ongLider,
    fecha_inicio: new Date('2024-01-15'),
    fecha_fin: new Date('2024-12-31'),
    en_ejecucion: true,
  }));

  const proyectoSalud = await proyectoRepo.save(proyectoRepo.create({
    nombre: 'Iniciativa Salud Comunitaria',
    descripcion: 'Campaña de prevención y salud básica',
    ong_lider: ongLider,
    fecha_inicio: new Date('2024-03-01'),
    fecha_fin: new Date('2024-11-30'),
    en_ejecucion: true,
  }));

  const proyectoReforestacion = await proyectoRepo.save(proyectoRepo.create({
    nombre: 'Campaña Reforestación',
    descripcion: 'Restauración de áreas naturales protegidas',
    ong_lider: ongColaboradora,
    fecha_inicio: new Date('2024-02-01'),
    fecha_fin: new Date('2024-08-31'),
    en_ejecucion: false,
  }));

  // Seed Etapas
  await etapaRepo.save(etapaRepo.create({
    nombre: 'Diagnóstico Comunitario',
    descripcion: 'Evaluación de necesidades educativas',
    proyecto: proyectoEducacion,
    ong_ejecutora: ongLider,
    is_completed: true,
  }));

  await etapaRepo.save(etapaRepo.create({
    nombre: 'Diseño Curricular',
    descripcion: 'Desarrollo de material educativo',
    proyecto: proyectoEducacion,
    ong_ejecutora: ongLider,
    is_completed: false,
  }));

  await etapaRepo.save(etapaRepo.create({
    nombre: 'Estudio Epidemiológico',
    descripcion: 'Análisis de situación de salud',
    proyecto: proyectoSalud,
    ong_ejecutora: ongColaboradora,
    is_completed: true,
  }));

  await etapaRepo.save(etapaRepo.create({
    nombre: 'Capacitación de Voluntarios',
    descripcion: 'Formación del equipo de trabajo',
    proyecto: proyectoSalud,
    ong_ejecutora: ongLider,
    is_completed: false,
  }));

  await etapaRepo.save(etapaRepo.create({
    nombre: 'Identificación de Áreas',
    descripcion: 'Selección de zonas a reforestar',
    proyecto: proyectoReforestacion,
    ong_ejecutora: ongColaboradora,
    is_completed: false,
  }));

  console.log('Seed completed successfully!');
  console.log('Created:');
  console.log('- 2 ONGs');
  console.log('- 5 Usuarios');
  console.log('- 3 Proyectos');
  console.log('- 5 Etapas');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error', err);
  process.exit(1);
});