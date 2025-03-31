import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, forwardRef } from '@nestjs/common';

import { Observable, switchMap } from 'rxjs';

import { MinioClientService } from '../../modules/minio-client';


@Injectable()
export class TransformFileInterceptor<T> implements NestInterceptor {
  constructor(
    @Inject(forwardRef(() => MinioClientService))
    private readonly minioClientService: MinioClientService
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<T | T[]> | Promise<Observable<T | T[]>> {
    return next.handle().pipe(
      switchMap(async (data: T | T[]) => {
        if (data instanceof Array) {
          return this.transformFileUrlsInArray(data);
        }

        return this.transformFileUrl(data as T);
      }),
    );
  }

  async transformFileUrl<T>(
    data: T,
  ): Promise<T> {
    const fileKey = 'imageUrl';
    const fileUrl = data[fileKey];
    const isExternalFileUrl = fileUrl?.startsWith('http');
  
    if (fileUrl && !isExternalFileUrl) {
      data[fileKey] = await this.minioClientService.getFileUrl(fileUrl);
    }
  
    return data;
  }
  
  async transformFileUrlsInArray<T>(
    data: T[],
  ): Promise<T[]> {
    return Promise.all(data.map(item => this.transformFileUrl(item)));
  }
}
