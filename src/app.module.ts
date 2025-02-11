import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    MinioClientModule,
    DetectorModule,
    UserModule,
    AdminModule,
    MSGRelayModule,
    InferenceEventConsumerModule,
    RabbitMqModule,
  ],
  providers: [AppService],
})
export class AppModule {}
