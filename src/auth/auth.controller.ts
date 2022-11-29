import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto, ForgotDto, ResetDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Post('forgot')
  forgotPassword(@Body() forgotDto: ForgotDto) {
    return this.authService.forgotPassword(forgotDto);
  }
  @Post('reset')
  resetPassword(@Body() resetDto: ResetDto) {
    return this.authService.resetPassword(resetDto);
  }
}
