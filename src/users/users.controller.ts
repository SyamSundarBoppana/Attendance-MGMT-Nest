import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create.user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getuserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    const { password } = updateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    updateUserDto.password = hashedPassword;
    const user = await this.userService.updateUserById(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const user = await this.userService.deleteUserByid(id);
    return 'User Deleted';
  }
}
