import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_EXPIRY, TOKEN_SECRET } from './auth.constants';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: TOKEN_SECRET.accessToken,
    signOptions: { expiresIn: TOKEN_EXPIRY.accessToken },
  }),],
})
export class AuthModule {
}
