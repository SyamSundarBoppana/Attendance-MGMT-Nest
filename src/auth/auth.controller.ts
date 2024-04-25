import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post()
  @ApiBody({
    type: AuthDto,
    examples: {
      admin: {
        value: {
          email: 'syam@fs.com',
          password: '12345',
        } as AuthDto,
      },
    },
  })
  async SignIn(@Body() authDto: AuthDto) {
    return this.authservice.Login(authDto);
  }
}
