import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.services';
// import { User } from '@prisma/client';
import { CreateUserDto } from './create.user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDto){
    return await this.prisma.user.create({ data: userData });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id:string){
    return await this.prisma.user.findFirst({where:{id:id}});
  }

  async updateUserById(id:string,updateUserDto:CreateUserDto){
    return await this.prisma.user.update({where:{id},data: updateUserDto})
  }

  async deleteUserByid(id:string){
    return await this.prisma.user.delete({where:{id:id}})
  }
}
