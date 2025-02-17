import { ValidationError } from '@nestjs/common';

import { ErrorException } from '../../common/exceptions';
import { CODES } from '../constant';
import { ICode } from '../interfaces';

export const validationExceptionFactory = (errors: ValidationError[]): ErrorException => {
  const message = errors.flatMap(error => getErrorConstraints(error));

  return errorBuilder(CODES.BAD_REQUEST, JSON.stringify(message));
};

export const errorBuilder = (
  code: ICode,
  message?: string
): ErrorException => {
  return new ErrorException(code, undefined, message);
};

const getErrorConstraints = (error: ValidationError): string[] => {
  const children = error.children;
  const results: string[] = [];

  if (children) {
    children.forEach((child: ValidationError) => {
      results.push(...getErrorConstraints(child));
    });
  }

  if (error.constraints) {
    results.push(...Object.values(error.constraints));
  }

  return results;
};
