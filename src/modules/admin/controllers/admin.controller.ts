import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';

import { JwtAccessGuard, Roles, RolesGuard } from '../../../common';
import { IPaginationResponse, UserRole } from '../../../shared';
import { UserDocument } from '../../user/schemas';
import { GetUserDashboard, UpdateUserRoleDto } from '../dto';
import { AdminService } from '../services';

@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(UserRole.Admin)
  @Get('user-dashboard')
  async getUserDashboard(
    @Query() getUserDashboard: GetUserDashboard
  ): Promise<IPaginationResponse<UserDocument>> {
    return this.adminService.getUserDashboard(getUserDashboard);
  }

  @Roles(UserRole.Admin)
  @Get('roles')
  async getRoleList(): Promise<UserRole[]> {
    return Object.values(UserRole);
  }

  @Roles(UserRole.Admin)
  @Patch('manage-role')
  async manageUserRole(
    @Body() updateUserRoleDto: UpdateUserRoleDto
  ): Promise<void> {
    return this.adminService.manageUserRole(updateUserRoleDto);
  }
}
