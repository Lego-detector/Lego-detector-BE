import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { ENV, envObject } from './config';
import {
  DetectorModule,
  InferenceEventConsumerModule,
  MSGRelayModule,
  MinioClientModule,
  RabbitMqModule,
  UserModule,
} from './modules';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';

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
    EventEmitterModule.forRoot(),
    MinioClientModule,
    DetectorModule,
    UserModule,
    AdminModule,
    MSGRelayModule,
    InferenceEventConsumerModule,
    RabbitMqModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
