import { SetMetadata } from '@nestjs/common';

import { UserRole } from '../../shared';


export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const ExcludeRoles = (...excludeRoles: string[]) => {
  const allRoles: string[] = Object.keys(UserRole)
    .map(key => UserRole[key])
    .filter(k => !(parseInt(k) >= 0));

  const allowedRoles = allRoles.filter(role => !excludeRoles.includes(role));

  return SetMetadata('roles', allowedRoles);
};
