import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? (process?.env?.CLIENTS_URL.split(',') ?? '')
        : '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
