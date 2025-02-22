import { IsNotEmpty, IsString } from 'class-validator';

export class OauthLoginDto {
  @IsNotEmpty()
  @IsString()
  authorizationCode: string;
}
