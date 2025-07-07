import { IsNotEmpty, IsString } from 'class-validator';

export class LocalSignInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
