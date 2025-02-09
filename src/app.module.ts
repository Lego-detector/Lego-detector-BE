import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AmqpModule } from 'nestjs-amqp';

import { AppService } from './app.service';
import { ENV, envObject } from './config';
import {
  CdcListenerModule,
  DetectorModule,
  InferenceResultHandlerModule,
  MinioClientModule,
  UserModule,
} from './modules';
import { AdminModule } from './modules/admin/admin.module';
import { RabbitMqModule } from './modules/worker-modules/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envObject,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ENV.MONGO_URI),
        verboseRetryLog: true,
      }),
      inject: [ConfigService],
    }),
    AmqpModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        hostname: configService.get<string>(ENV.MQ_HOSTNAME),
        port: configService.get<number>(ENV.MQ_PORT),
        username: configService.get<string>(ENV.MQ_USER),
        password: configService.get<string>(ENV.MQ_PWD),
      }),
      inject: [ConfigService],
    }),
    MinioClientModule,
    DetectorModule,
    UserModule,
    AdminModule,
    CdcListenerModule,
    InferenceResultHandlerModule,
    RabbitMqModule,
  ],
  providers: [AppService],
})
export class AppModule {}
