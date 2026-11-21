import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';

import type { Request } from 'express';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';

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
@UseGuards(AccessTokenGuard)
@Post('addresses')
async createAddress(
  @Req() request: AuthenticatedRequest,
  @Body() body: CreateAddressDto,
) {
  return this.usersService.createAddress(request.user.sub, body);
}
@UseGuards(AccessTokenGuard)
@Get('addresses')
async getAddresses(@Req() request: AuthenticatedRequest) {
  return this.usersService.getAddresses(request.user.sub);
}
@UseGuards(AccessTokenGuard)
@Patch('addresses/:id')
async updateAddress(
  @Req() request: AuthenticatedRequest,
  @Param('id') addressId: string,
  @Body() body: UpdateAddressDto,
) {
  return this.usersService.updateAddress(
    request.user.sub,
    addressId,
    body,
  );
}
}