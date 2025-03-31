import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { JwtAccessGuard, TransformFileInterceptor } from '../../../common';
import { CurrentUser } from '../../../common/decorators';
import { HistoryDocument } from '../../detector/schemas';
import { UserEntity } from '../domain/entities';
import { UserService } from '../services';


@UseGuards(JwtAccessGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(TransformFileInterceptor)
  @Get('history')
  async getHistory(@CurrentUser() user: UserEntity): Promise<HistoryDocument[]> {
    return this.userService.getHistory(user);
  }

  @Get('quota')
  async getRemainedQuota(
    @CurrentUser() user: UserEntity,
  ): Promise<number> {
    return this.userService.getRemainedQuota(user._id.toString(), user.role);
  }
}
