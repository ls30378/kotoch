import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsOptional()
  username: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  password: string;
}
