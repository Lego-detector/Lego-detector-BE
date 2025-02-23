import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { AdminController } from './controllers';
import { AdminService } from './services/admin.service';

@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
