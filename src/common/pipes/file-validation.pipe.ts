import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { Express } from 'express';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private fileType: RegExp;
  private maxSize: number;
  private required: boolean;

  constructor(
    fileType: RegExp = /(jpg|jpeg|png|pdf)/,
    maxSize: number = 5242880,
    required: boolean = true,
  ) {
    this.fileType = fileType;
    this.maxSize = maxSize;
    this.required = required;
  }

  async transform(
    files: Express.Multer.File | Array<Express.Multer.File>,
  ): Promise<Express.Multer.File | Array<Express.Multer.File>> {
    if (files instanceof Array) {
      return this.validateFiles(files);
    }

    return this.validateFile(files);
  }

  private validateFile(file: Express.Multer.File) {
    if (this.required && !file) {
      throw new BadRequestException('File is required');
    }

    if (file && !this.fileType.test(file.mimetype)) {
      throw new BadRequestException('Error uploading file type');
    }

    if (file && file.size > this.maxSize) {
      throw new BadRequestException('File too large');
    }

    return file;
  }

  private validateFiles(files: Array<Express.Multer.File>) {
    if (this.required && !files.length) {
      throw new BadRequestException('File is required');
    }

    files.forEach(file => {
      this.validateFile(file);
    });

    return files;
  }
}
