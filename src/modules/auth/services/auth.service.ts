import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ErrorException } from '../../../common';
import { ENV } from '../../../config';
import { CODES, IAuthResponse, ICredentials, ITokenPayload, generateArgon2Hash } from '../../../shared';
import { UserEntity } from '../../user/domain/entities';
import { UserService } from '../../user/services';
import { LocalSignInDto, LocalSignUpDto } from '../dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(localSigninDto: LocalSignInDto): Promise<IAuthResponse> {
    const { email, password } = localSigninDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      //REMIND: Dummy user for creating time safe signIn mechanism
      await generateArgon2Hash('');
      ///////////////////////////////////////////////////////////////

      throw new ErrorException(CODES.SIGNIN_FAILED);
    }

    const isMatch = await user.verifyPassword(password);

    if (!isMatch) {
      throw new ErrorException(CODES.SIGNIN_FAILED);
    }

    return this.createSignInResponse(user);
  }

  async signUp(
    localSignUpDto: LocalSignUpDto,
    profileImage: Express.Multer.File,
  ): Promise<IAuthResponse> {
    const existsUser = await this.userService.findOneByEmail(localSignUpDto.email);

    if (existsUser) {
      throw new ErrorException(CODES.USER_EMAIL_CONFLICT);
    }

    const newUser = await this.userService.create(localSignUpDto, profileImage);

    return this.createSignInResponse(newUser);
  }

  async refreshAccessToken(user: UserEntity, token: string): Promise<ICredentials> {
    const isMatch = await user.verifyRefreshToken(token);

    if (isMatch) {
      return {
        accessToken: this.generateAccessToken(user._id.toString()),
      }
    }

    throw new ErrorException(CODES.UNAUTHORIZED);
  }

  async revokeToken(user: UserEntity): Promise<void> {
    this.userService.revokeRefreshToken(user._id.toString());
  }

  private async createSignInResponse(user: UserEntity): Promise<IAuthResponse> {
    const userDoc = user.toDocument();

    userDoc.password = undefined;

    return {
      credentials: await this.generateCredential(userDoc._id.toString()),
      profile: userDoc,
    };
  }

  async generateCredential(userId: string): Promise<ICredentials> {
    return {
      accessToken: this.generateAccessToken(userId),
      refreshToken: await this.generateRefreshToken(userId),
    };
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
