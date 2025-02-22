import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CODES, IResponse, mapResponse } from 'src/shared';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next.handle().pipe(
      map(data => {
        const response = context.switchToHttp().getResponse();
        const { statusCode, ...detail } = mapResponse(CODES.OK, data);

        response.status(statusCode);

        return detail;
      }),
    );
  }
}
