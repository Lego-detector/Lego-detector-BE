import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ErrorException } from '../../../common/exceptions';
import { ENV } from '../../../config';
import { CODES } from '../../../shared/constant';
import { ITokenPayload } from '../../../shared/interfaces';
import { verifySha256Hash } from '../../../shared/utils';
import { UserEntity } from '../../user/domain/entities';
import { UserService } from '../../user/services';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ENV.JWT_REFRESH_TOKEN_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: ITokenPayload): Promise<UserEntity> {
    const user = await this.usersService.findById(payload.sub);

    if (!user?.refreshToken) {
      throw new ErrorException(CODES.AGW_002);
    }

    const isRefreshTokenMatch = await verifySha256Hash(
      request.body?.refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatch) {
      throw new ErrorException(CODES.UNAUTHORIZED);
    }

    return user;
  }
}
