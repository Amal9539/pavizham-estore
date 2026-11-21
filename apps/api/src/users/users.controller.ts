import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';

import type { Request } from 'express';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: string;
    email: string;
    role: string;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getProfile(@Req() request: AuthenticatedRequest) {
    return this.usersService.getProfile(request.user.sub);
  }
  @UseGuards(AccessTokenGuard)
@Patch('me')
async updateProfile(
  @Req() request: AuthenticatedRequest,
  @Body() body: UpdateProfileDto,
) {
  return this.usersService.updateProfile(request.user.sub, body);
}
}