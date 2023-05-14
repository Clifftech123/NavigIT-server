import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './strategies/jwt/jwt.service';
import { GoogleService } from './strategies/google/google.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, GoogleService]
})
export class AuthModule {}
