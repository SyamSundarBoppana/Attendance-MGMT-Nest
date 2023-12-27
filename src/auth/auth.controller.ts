import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post()
    async SignIn(@Body() authDto:AuthDto){
        return this.authservice.Login(authDto);
    }
}
