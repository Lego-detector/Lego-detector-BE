import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileValidationPipe } from 'src/common';
import { IAuthResponse } from 'src/shared';

import { LocalSignInDto, LocalSignUpDto } from '../dto';
import { AuthService } from '../services';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() localSignInDto: LocalSignInDto
  ): Promise<IAuthResponse> {
    return this.authService.signIn(localSignInDto);
  }

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('image'))
  async signUp(
    @UploadedFile(new FileValidationPipe(undefined, undefined, false))
    profileImage: Express.Multer.File,
    @Body() localSignUpDto: LocalSignUpDto,
  ): Promise<IAuthResponse> {
    return this.authService.signUp(localSignUpDto, profileImage);
  }
}
