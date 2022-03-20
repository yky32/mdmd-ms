import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  // Init fasitfy
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter()
  );

  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle('api-mdmd.app')
    .setDescription('mdmd api documents')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  // Enable CORS
  app.enableCors();

  // Start server
  await app.listen(3000);
}

// Start server
bootstrap();
