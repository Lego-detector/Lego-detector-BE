import { IsNotEmpty, IsString } from 'class-validator';

export class LocalSigninDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
