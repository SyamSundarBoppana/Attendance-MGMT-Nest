import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../prisma.services';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [UsersModule, AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService,PrismaService, AuthService,JwtService],
})
export class AppModule {}
