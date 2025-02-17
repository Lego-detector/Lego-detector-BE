import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (key: string | undefined, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (key) {
      return user && user[key];
    }

    return user;
  },
);
