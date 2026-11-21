
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AccessTokenGuard } from './guards/access-token.guard.js';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard],
  exports: [AuthService, AccessTokenGuard],
})
export class AuthModule {}
