/*Archivo src/main.ts */
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new Logger());
  await app.listen(3000);
}
bootstrap();