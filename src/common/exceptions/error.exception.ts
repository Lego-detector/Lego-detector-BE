import { HttpException } from '@nestjs/common';

import { ICode } from '../../shared/interfaces';
import { mapResponse } from '../../shared/utils';

export class ErrorException extends HttpException {
  readonly display;

  constructor(code: ICode, display?: string, message?: string | string[]) {
    const { statusCode, ...response } = mapResponse(code, undefined, display, message);

    super(response, statusCode);
    this.display = display;
  }
}
