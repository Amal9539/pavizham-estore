import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { AccessTokenGuard } from './guards/access-token.guard.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: string;
    email: string;
    role: string;
  };
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/auth',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body);

    response.cookie('refreshToken', result.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: result.message,
      accessToken: result.accessToken,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Refresh token is required');
    }

    const result = await this.authService.refresh(refreshToken);

    response.cookie('refreshToken', result.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: result.message,
      accessToken: result.accessToken,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(
    @Req() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('refreshToken', cookieOptions);

    return this.authService.logout(request.user.sub);
  }
}