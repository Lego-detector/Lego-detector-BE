import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Response } from 'express';

import { CODES } from '../../shared';
import { mapResponse } from '../../shared/utils';

@Catch(Error)
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger: Logger = new Logger('InternalError');

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const { statusCode, ...detail } = mapResponse(CODES.INTERNAL_SERVER_ERROR, undefined, exception.message);

    this.logger.fatal(`${exception?.stack}`);

    response.status(statusCode).json(detail);
  }
}
