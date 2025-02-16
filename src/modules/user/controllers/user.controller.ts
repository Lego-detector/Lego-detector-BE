import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../dto';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);

  }
}
