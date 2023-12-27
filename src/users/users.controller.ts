import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create.user.dto';
import * as bcrypt from "bcrypt";
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post('')
    async createUser(@Body() createUserDto:CreateUserDto){
        const {password} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashedPassword;
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers(){
        const users = await this.userService.getUsers();
        return users 
    }

    @Get(':id')
    async getuserById(@Param('id') id:string){
        const user = await this.userService.getUserById(id);
        return user;
    }

    @Patch(':id')
    async updateUserById(@Param('id') id :string, @Body() updateUserDto: CreateUserDto){
        const {password} = updateUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        updateUserDto.password = hashedPassword;
        const user = await this.userService.updateUserById(id,updateUserDto);
        return user;
    }
    
    @Delete(':id')
    async deleteById(@Param()params:string){
        const user = await this.userService.deleteUserByid(params);
        return "User Deleted"
    }
}
