import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as Minio from 'minio';

import { ErrorException } from 'src/common';
import { ENV } from 'src/config';
import { CODES, generateMd5Hash } from 'src/shared';

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

  async upload(
    directoryName: string,
    file: Express.Multer.File,
    supportedMimeTypes: RegExp = /(jpg|jpeg|png)/,
    suffixFileName: string = '',
    fixedFileName?: string,
  ): Promise<string> {
    if (!file || !file.buffer || !file.originalname) {
      throw new ErrorException(CODES.FILE_REQUIRED);
    }

    if (!supportedMimeTypes.test(file.mimetype)) {
      throw new ErrorException(CODES.MIMETYPE_MISMATCH);
    }

    const ext = path.extname(file.originalname);
    const fileName = fixedFileName ? fixedFileName : this.generateFileName(file);
    const objectName = `${directoryName}/${fileName}${suffixFileName}${ext}`;

    await this.uploadFile(objectName, file.buffer, file.size);

    return objectName;
  }

  generateFileName(file: Express.Multer.File): string {
    const timestamp = Date.now().toString();
    const randomNumber = Math.random();

    return generateMd5Hash(`${randomNumber}${timestamp}${file.originalname}`);
  }

  async getFileAsBuffer(objectName: string): Promise<Buffer> {
    try {
      const stream = await this.minioClient.getObject(this.bucketName, objectName);
      const chunks: Buffer[] = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error) {
      console.error('Error getting file as Buffer:', error);

      throw error;
    }
  }

  private async uploadFile(filename: string, buffer: Buffer, size: number): Promise<void> {
    try {
      await this.minioClient.putObject(this.bucketName, filename, buffer, size);
    } catch (error) {
      this.logger.error(error);

      throw new ErrorException(CODES.FAILED_TO_UPLOAD);
    }
  }
}
