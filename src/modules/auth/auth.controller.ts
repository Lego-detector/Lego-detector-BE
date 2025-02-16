import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileValidationPipe } from '../../common';
import { IAuthResponse } from '../../shared/interfaces';
import { CreateUserDto } from '../user/dto/';

import { AuthService } from './auth.service';
import { LocalSigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() localSignInDto: LocalSigninDto
  ): Promise<IAuthResponse> {
    return this.authService.signIn(localSignInDto);
  }

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(
    @UploadedFile(new FileValidationPipe(undefined, undefined, false))
    profileImage: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ): Promise<IAuthResponse> {
    return this.authService.signUp(createUserDto);
  }
}
