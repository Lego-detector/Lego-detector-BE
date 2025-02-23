import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';

import { AuthController, AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy } from '.';


@Module({
  imports: [ JwtModule, UserModule, PassportModule ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
