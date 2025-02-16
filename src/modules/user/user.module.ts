import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers';
import { UserMapper } from './domain/mappers';
import { UserRepository } from './repositories';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
  exports: [UserService, UserRepository, UserMapper]
})
export class UserModule {}
