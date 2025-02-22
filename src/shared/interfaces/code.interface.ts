import { HttpStatus } from '@nestjs/common';

export interface ICode {
  message: string;
  display: string;
  statusCode: HttpStatus;
}

export type ICodeObj = Record<string, ICode>;
