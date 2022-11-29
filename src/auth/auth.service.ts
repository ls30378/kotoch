import { MailService } from './../mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, ForgotDto, ResetDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private mailer: MailService,
  ) {}
  async signToken(
    userId: number,
    username: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, { secret });
    return { access_token: token };
  }
  async resetPassword(resetDto: ResetDto) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: resetDto.email,
        },
      });
      if (user.pin !== resetDto.pin)
        throw new UnauthorizedException('Wrong pin provided!');
      const hash = await argon.hash(resetDto.password);
      const pin = Math.floor(100000 + Math.random() * 900000);
      const userUpdate = await this.prisma.user.update({
        where: {
          email: resetDto.email,
        },
        data: {
          password: hash,
          pin,
        },
      });
      console.log('Auth service', user.id, user.username, user.email);
      const token = await this.signToken(user.id, user.username, user.email);
      return { message: 'Password changed successfully!', accessToken: token };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
  async forgotPassword(forgotDto: ForgotDto) {
    try {
      const pin = Math.floor(100000 + Math.random() * 900000);
      const user = await this.prisma.user.update({
        where: {
          email: forgotDto.email,
        },
        data: {
          pin,
        },
      });
      await this.mailer.sendResetMail(user.email, user.name, pin);
      return { status: 200 };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025')
          throw new NotFoundException('User not found!');
      throw new HttpException(error.message, 400);
    }
  }
  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        username: dto.username,
      },
    });
    if (!user) throw new ForbiddenException('Credentials Incorrect!');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect!');
    const token = await this.signToken(user.id, user.email, user.username);
    delete user.password;
    return { user, access_token: token };
  }

  async signup(dto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          username: dto.username,
          email: dto.email,
          password: hash,
        },
      });

      return this.signToken(user.id, user.username, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
}
