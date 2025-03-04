import { UserRole } from '../enum';
import { IRolePolicy } from '../interfaces';

//TODO: add policy interface
export const ROLE_POLICY = new Map<UserRole, IRolePolicy>([
  [
    UserRole.L1,
    {
      SESSION_LIMIT: 5,
      HISTORY_LIMIT: 5,
    },
  ],
  [ 
    UserRole.Admin,
    {
      SESSION_LIMIT: undefined,
      HISTORY_LIMIT: undefined
    }
  ]
]);
