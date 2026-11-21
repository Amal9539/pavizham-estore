import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    const email = data.email.trim().toLowerCase();

    // Check whether the email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password using Argon2id
    const passwordHash = await argon2.hash(data.password, {
      type: argon2.argon2id,
    });

    // Save customer in PostgreSQL
    const user = await this.prisma.user.create({
      data: {
        name: data.name.trim(),
        email,
        passwordHash,
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

    return user;
  }
}