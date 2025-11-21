import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // 🔹 Configurar Swagger
  const swaggerPath = 'api-docs';
  const swaggerJsonPath = `${swaggerPath}-json`;
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
  SwaggerModule.setup(swaggerPath, app, document, {
    explorer: true, // habilita el form de exploración y el botón de descarga (JSON)
    swaggerUrl: `/${swaggerJsonPath}`,
    jsonDocumentUrl: swaggerJsonPath,
  });

  // 🔹 Render asigna automáticamente un puerto dinámico (PORT)
  const port = process.env.PORT || 3000;
  const host = '0.0.0.0'; // obligatorio para Render

  await app.listen(port, host);

  console.log(`🚀 API corriendo en http://${host}:${port}`);
  console.log(`📘 Swagger: http://${host}:${port}/api-docs`);
}
bootstrap();
