import { Injectable } from '@nestjs/common';

import { IPaginationResponse } from '../../../shared';
import { UserDocument } from '../../user/schemas';
import { UserService } from '../../user/services';
import { GetUserDashboard, UpdateUserRoleDto } from '../dto';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}

  async getUserDashboard(getUserDashboard: GetUserDashboard): Promise<IPaginationResponse<UserDocument>> {
    return this.userService.getPaginationUserList(getUserDashboard);
  }

  async manageUserRole(updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
    return this.userService.updateRole(
      updateUserRoleDto.userId, 
      updateUserRoleDto.role
    );
  }
}
