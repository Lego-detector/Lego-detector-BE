import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ErrorException } from 'src/common';
import { CODES } from 'src/shared';

import { ENV } from '../../config';
import { IAuthResponse, ICredentials, ITokenPayload } from '../../shared/interfaces';
import { UserEntity } from '../user/domain/entities';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/services';

import { LocalSigninDto } from './dto';


@Injectable()
export class AuthService {
    constructor (
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async signIn(localSigninDto: LocalSigninDto): Promise<IAuthResponse> {
      const { email, password } = localSigninDto;
      const user = await this.userService.findOneByEmail(email);
      /*
      * Make sure response time is equal for every request.
      * CAUTION: This approach makes the code harder to debug.
      */
     const isMatch = await user.verifyPassword(password);

      if (!user || !isMatch) {
        throw new ErrorException(CODES.UNAUTHORIZED);
      }
      ///////////////////////////////////////////////////////////////
      
      return this.createSignInResponse(user);
    }

    async signUp(createUserDto: CreateUserDto): Promise<IAuthResponse> {
      const newUser = await this.userService.create(createUserDto);

      return this.createSignInResponse(newUser);
    }

    async generateCredential(userId: string): Promise<ICredentials> {
      return {
        accessToken: this.generateAccessToken(userId),
        refreshToken: await this.generateRefreshToken(userId),
      };
    }
  
    async revokeToken(userId: string): Promise<void> {
      this.userService.revokeRefreshToken(userId);
    }

    private async createSignInResponse(user: UserEntity): Promise<IAuthResponse> {
      const userDoc = user.toDocument();
      
      userDoc.password = undefined;

      return {
        credentials: await this.generateCredential(userDoc._id.toString()),
        profile: userDoc
      }
    }

    private generateAccessToken(userId: string): string {
      const payload: ITokenPayload = {
        sub: userId,
      };
  
      return this.jwtService.sign(payload, {
        secret: this.configService.get<string>(ENV.JWT_ACCESS_TOKEN_SECRET),
        expiresIn: this.configService.get<string>(ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
      });
    }
  
    private async generateRefreshToken(userId: string): Promise<string> {
  
      const payload: ITokenPayload = {
        sub: userId,
      };
  
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>(ENV.JWT_REFRESH_TOKEN_SECRET),
        expiresIn: this.configService.get<string>(ENV.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
      });
  
      await this.userService.updateRefreshToken(userId, token);
  
      return token;
    }
}
