import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configuration } from './config';
import { LegoDetectorModule } from './lego-detector/lego-detector.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
      validationSchema: configuration,
      isGlobal: true,
    }), LegoDetectorModule,
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
