
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as argon2 from 'argon2';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CreateAddressDto } from './dto/create-address.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await argon2.hash(data.password, {
      type: argon2.argon2id,
    });

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
        phone: data.phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      message: 'Registration successful',
      user,
    };
  }
  async getProfile(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return {
    message: 'Profile retrieved successfully',
    user,
  };
}
async updateProfile(userId: string, data: UpdateProfileDto) {
  const user = await this.prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      phone: data.phone,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return {
    message: 'Profile updated successfully',
    user,
  };
}
async createAddress(userId: string, data: CreateAddressDto) {
  const address = await this.prisma.address.create({
    data: {
      userId,
      fullName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country ?? 'India',
    },
  });

  return {
    message: 'Address added successfully',
    address,
  };
}
async getAddresses(userId: string) {
  const addresses = await this.prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    message: 'Addresses retrieved successfully',
    addresses,
  };
}
}
