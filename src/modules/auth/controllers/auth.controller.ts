import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileValidationPipe, JwtAccessGuard, JwtRefreshGuard } from '../../../common';
import { CurrentUser } from '../../../common/decorators';
import { IAuthResponse, ICredentials } from '../../../shared';
import { UserEntity } from '../../user/domain/entities';
import { LocalSignInDto, LocalSignUpDto } from '../dto';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() localSignInDto: LocalSignInDto): Promise<IAuthResponse> {
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

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshAccessToken(
    @CurrentUser() user: UserEntity,
    @Body('refreshToken') refreshToken: string
  ): Promise<ICredentials> {
    return this.authService.refreshAccessToken(
      user,
      refreshToken
    )
  }

  @Post('revoke')
  @UseGuards(JwtAccessGuard)
  async revokeToken(
    @CurrentUser() user: UserEntity
  ): Promise<void> {
    return this.authService.revokeToken(user);
  }
}
