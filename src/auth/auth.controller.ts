import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto, ForgotDto, ResetDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log('sign up');
  }
  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    console.log('sign in');
  }

  @Post('forgot')
  forgotPassword(@Body() forgotDto: ForgotDto) {
    console.log('forgot password');
  }
  @Post('reset')
  resetPassword(@Body() resetDto: ResetDto) {
    console.log('reset password');
  }
}
