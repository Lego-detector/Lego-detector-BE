import { Body, Controller, Get, Patch, Query } from '@nestjs/common';

import { IPaginationResponse, UserRole } from '../../../shared';
import { UserDocument } from '../../user/schemas';
import { GetUserDashboard, UpdateUserRoleDto } from '../dto';
import { AdminService } from '../services';

// @UseGuards(RoleGuard, JwtAccessGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('user-dashboard')
  async getUserDashboard(
    @Query() getUserDashboard: GetUserDashboard
  ): Promise<IPaginationResponse<UserDocument>> {
    return this.adminService.getUserDashboard(getUserDashboard);
  }

  @Get('roles')
  async getRoleList(): Promise<UserRole[]> {
    return Object.values(UserRole);
  }

  @Patch('manage-role')
  async manageUserRole(
    @Body() updateUserRoleDto: UpdateUserRoleDto
  ): Promise<void> {
    return this.adminService.manageUserRole(updateUserRoleDto);
  }
}
