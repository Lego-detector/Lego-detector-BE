import { HttpStatus } from '@nestjs/common';

import { UserDocument } from '../../modules/user/schemas';

import { ICredentials } from './token.interface';

export interface IResponse<T> {
  message: string | string[];
  display: string;
  statusCode?: HttpStatus;
  data?: T;
}

export interface IAuthResponse {
  credentials: ICredentials;
  profile: Partial<UserDocument>;
}
