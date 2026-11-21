
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto.js';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // LOGIN
  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      data.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateTokens(user);
  }

  // REFRESH TOKEN
  async refresh(refreshToken: string) {
    let payload: { sub: string };

    try {
      payload = await this.jwtService.verifyAsync<{
        sub: string;
      }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user || !user.isActive || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenValid = await argon2.verify(
      user.refreshTokenHash,
      refreshToken,
    );

    if (!tokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }

  // LOGOUT
  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });

    return {
      message: 'Logout successful',
    };
  }

  // GENERATE ACCESS AND REFRESH TOKENS
  private async generateTokens(user: {
    id: string;
    email: string;
    role: string;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        tokenId: randomUUID(),
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    const refreshTokenHash = await argon2.hash(refreshToken);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshTokenHash,
      },
    });

    return {
      message: 'Authentication successful',
      accessToken,
      refreshToken,
    };
  }
}
