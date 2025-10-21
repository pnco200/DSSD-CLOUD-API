import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('API de Colaboraciones')
    .setDescription('Documentación de la API para proyectos y etapas')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // CORS habilitado por si lo necesitás
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 API corriendo en http://localhost:3000');
  console.log('📘 Swagger: http://localhost:3000/api-docs');
}
bootstrap();
