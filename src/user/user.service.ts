import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUserDetails(username: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
        select: {
          name: true,
          username: true,
          likes: true,
        },
      });
      if (!user)
        throw new HttpException('No user found with that username!', 204);
      const userLikes = user.likes;

      delete user.likes;
      return { ...user, totalLikes: userLikes.length };
    } catch (error) {
      return error;
    }
  }
}
