import { UserRole } from '../enum';
import { IRolePolicy } from '../interfaces';

export const ROLE_POLICY = new Map<UserRole, IRolePolicy>([
  [
    UserRole.L1,
    {
      SESSION_LIMIT: 5,
      HISTORY_LIMIT: 5,
    },
  ],
  [ 
    UserRole.L2,
    {
      SESSION_LIMIT: 10,
      HISTORY_LIMIT: 10
    }
  ],
  [ 
    UserRole.L3,
    {
      SESSION_LIMIT: 15,
      HISTORY_LIMIT: 15
    }
  ],
  [ 
    UserRole.L4,
    {
      SESSION_LIMIT: 20,
      HISTORY_LIMIT: 20
    }
  ],
  [ 
    UserRole.Admin,
    {
      SESSION_LIMIT: undefined, // unlimit
      HISTORY_LIMIT: undefined  // unlimit
    }
  ]
]);
