import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> | Promise<Observable<Response>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { url, method } = request;
    const userAgent = request.headers['user-agent'];
    const remoteIp =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.ip;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${method} ${url} ${response.statusCode} - ${userAgent} ${remoteIp}`);
      }),

      catchError(error => {
        const statusCode =
          error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error(`${method} ${url} ${statusCode} - ${userAgent} ${remoteIp}`);

        return throwError(() => error);
      }),
    );
  }
}
