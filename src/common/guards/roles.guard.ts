import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CODES } from 'src/shared';

import { ErrorException } from '../exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.roles?.TEC);
  }

  private matchRoles(roles: string[], userRole: string) {
    const isRoleMatch = roles.some(role => role === userRole);

    if (!isRoleMatch) {
      throw new ErrorException(CODES.FORBIDDEN);
    }

    return isRoleMatch;
  }
}
