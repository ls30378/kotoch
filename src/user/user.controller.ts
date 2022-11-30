import { RolesGuard } from './../auth/guard/roles.guard';
import { OptionalJwtGuard } from './../auth/guard/optional-jwt.guard';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { GetUser } from 'src/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('id/:username')
  @UseGuards(OptionalJwtGuard, RolesGuard)
  @Roles(0, 1, 2)
  getUserDetails(@Param('username') username: string) {
    console.log(username);
  }

  @Get('trending')
  @UseGuards(OptionalJwtGuard, RolesGuard)
  @Roles(0, 1, 2)
  getTrendingUsers() {
    console.log('trending');
  }

  @Post('like/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(1, 2)
  likeUser(@GetUser('id') id: number, @Param('id') userId: number) {
    console.log(id, userId);
  }
}
