import { Injectable } from '@nestjs/common';

import { UserDocument } from 'src/modules/user/schemas';
import { UserService } from 'src/modules/user/services';
import { IPaginationResponse } from 'src/shared';

import { GetUserDashboard } from '../dto';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}

  async getUserDashboard(getUserDashboard: GetUserDashboard): Promise<IPaginationResponse<UserDocument>> {
    return this.userService.getPaginationUserList(getUserDashboard);
  }
}
