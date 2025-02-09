import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as Minio from 'minio';

import { ENV } from 'src/config';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger = new Logger(MinioClientService.name);
  private readonly bucketName = this.configService.get<string>(ENV.MINIO_BUCKET_NAME);
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    const minioOption: Minio.ClientOptions = {
      endPoint: this.configService.get<string>(ENV.MINIO_ENDPOINT),
      port: this.configService.get<number>(ENV.MINIO_PORT),
      useSSL: this.configService.get<boolean>(ENV.MINIO_USE_SSL),
      accessKey: this.configService.get<string>(ENV.MINIO_ACCESS_KEY),
      secretKey: this.configService.get<string>(ENV.MINIO_SECRET_KEY),
    };

    this.minioClient = new Minio.Client(minioOption);
  }
}
