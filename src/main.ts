import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter, InternalExceptionFilter } from './common/filters';
import { LoggingInterceptor, ResponseInterceptor } from './common/interceptors';
import { ENV } from './config';
import { validationExceptionFactory } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(ENV.PORT);

  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
    credentials: true,                        // Allow cookies
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseInterceptor());
  app.useGlobalFilters(new InternalExceptionFilter(configService), new HttpExceptionFilter());

  await app.listen(port ?? 3000);
}

bootstrap();
