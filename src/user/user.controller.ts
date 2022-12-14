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

  @Get('username/:username')
  @UseGuards(OptionalJwtGuard, RolesGuard)
  @Roles(0, 1, 2)
  getUserDetails(@Param('username') username: string) {
    return this.userService.getUserDetails(username);
  }

  @Get('trending')
  @UseGuards(OptionalJwtGuard, RolesGuard)
  @Roles(0, 1, 2)
  getTrendingUsers() {
    return this.userService.getTrendingUsers();
  }

  @Post('like/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(1, 2)
  likeUser(@GetUser('id') id: number, @Param('id') userId: number) {
    return this.userService.likeUser(id, userId);
  }
}
