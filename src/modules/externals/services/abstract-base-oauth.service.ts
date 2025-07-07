import { NotImplementedException } from '@nestjs/common';

import { IOauthProfile } from '../../../shared';


export abstract class AbstractBaseOauthService {
  getLoginLink(): string {
    throw new NotImplementedException();
  }

  async verifyAuthorizationCode(_code: string): Promise<unknown> {
    throw new NotImplementedException();
  }

  async getProfile(_payload): Promise<IOauthProfile> {
    throw new NotImplementedException();
  }
}
