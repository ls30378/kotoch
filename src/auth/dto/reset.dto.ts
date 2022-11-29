import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class ResetDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @Match('password', { message: 'Password is not matching!' })
  confirmPassword: string;
  @IsNumber()
  @IsNotEmpty()
  pin: number;
  @IsEmail()
  email: string;
}
