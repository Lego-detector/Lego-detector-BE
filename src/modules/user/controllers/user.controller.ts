import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAccessGuard } from 'src/common';
import { CurrentUser } from 'src/common/decorators';
import { HistoryDocument } from 'src/modules/detector/schemas';

import { UserEntity } from '../domain/entities';
import { UserService } from '../services';

@UseGuards(JwtAccessGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('history')
  async getHistory(@CurrentUser() user: UserEntity): Promise<HistoryDocument[]> {
    return this.userService.getHistory(user);
  }
}
