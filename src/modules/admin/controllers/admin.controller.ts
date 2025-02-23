import { Controller, Get, Query } from '@nestjs/common';

import { UserDocument } from 'src/modules/user/schemas';
import { IPaginationResponse } from 'src/shared';

import { GetUserDashboard } from '../dto';
import { AdminService } from '../services';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/user-dashboard')
  async getUserDashboard(
    @Query() getUserDashboard: GetUserDashboard
  ): Promise<IPaginationResponse<UserDocument>> {
    return this.adminService.getUserDashboard(getUserDashboard);
  }
}
