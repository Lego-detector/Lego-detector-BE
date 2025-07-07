import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ErrorException } from '../../../common';
import { ENV } from '../../../config';
import { CODES, ITokenPayload } from '../../../shared';
import { UserEntity } from '../../user/domain/entities';
import { UserService } from '../../user/services';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ENV.JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: ITokenPayload): Promise<UserEntity> {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new ErrorException(CODES.UNAUTHORIZED);
    }

    return user;
  }
}
