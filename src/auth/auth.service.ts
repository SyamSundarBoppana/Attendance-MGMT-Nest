import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.services';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_SECRET } from './auth.constants';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private authservice: PrismaService,
    private jwtService: JwtService,
  ) {}

  async Login(authDto:AuthDto) {
    const { email, password } = authDto;
    const user = await this.authservice.user.findFirst({
      where: { email: email },
    });
    const login = await bcrypt.compare(password, user.password);
    if (login) {
        const payload = {sub:user.id, email:user.email}
        const accessToken = this.jwtService.sign({ payload }, { privateKey: TOKEN_SECRET.accessToken });
      return `Welcome ${user.name}
      access_token:${accessToken}`;
    }
    return 'Invalid user credentails';
  }
}
