import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const message = Object.values(firstError.constraints)[0];
        throw new BadRequestException({
          statusCode: 400,
          error: 'Validation Error',
          message,
        });
      },
    }),
  );
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? (process?.env?.CLIENTS_URL.split(',') ?? '')
        : '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
