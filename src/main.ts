import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter, InternalExceptionFilter } from './common/filters';
import { LoggingInterceptor, ResponseInterceptor } from './common/interceptors';
import { ENV } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(ENV.PORT);

  app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseInterceptor());
  app.useGlobalFilters(new InternalExceptionFilter(configService), new HttpExceptionFilter());

  await app.listen(port ?? 3000);
}

bootstrap();
