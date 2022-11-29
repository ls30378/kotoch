import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  // REGEX FOR Minimum eight characters, at least one uppercase letter, one lowercase letter and one number and one special character
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @IsOptional()
  password: string;

  @Match('password', { message: 'Password must match!' })
  @IsOptional()
  confirmPassword: string;
}
