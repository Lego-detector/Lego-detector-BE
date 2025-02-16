import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
