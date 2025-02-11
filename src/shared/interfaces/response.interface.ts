import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  message: string | string[];
  display: string;
  statusCode?: HttpStatus;
  data?: T;
}
