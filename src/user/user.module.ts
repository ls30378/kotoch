import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
