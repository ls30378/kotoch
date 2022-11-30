import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  async likeUser(id: number, userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: +userId,
        },
        select: {
          username: true,
          name: true,
          likes: true,
        },
      });
      if (user.likes.includes(id)) {
        const updateUser = await this.prismaService.user.update({
          where: {
            id: +userId,
          },
          data: {
            likes: user.likes.filter((l) => l !== id),
          },
        });
        return { ...user, likes: updateUser.likes.length };
      } else {
        const updateUser = await this.prismaService.user.update({
          where: {
            id: +userId,
          },
          data: {
            likes: {
              push: +id,
            },
          },
        });

        return { ...user, likes: updateUser.likes.length };
      }
    } catch (error) {
      return error;
    }
  }
  async getTrendingUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        orderBy: { likes: 'desc' },
        take: 3,
      });
      return users;
    } catch (error) {
      return error;
    }
  }
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
        return new HttpException('No user found with that username!', 204);
      const userLikes = user.likes;

      delete user.likes;
      return { ...user, totalLikes: userLikes.length };
    } catch (error) {
      return error;
    }
  }
}
