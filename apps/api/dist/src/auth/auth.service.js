var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(data) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user || !user.isActive) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const passwordValid = await argon2.verify(user.passwordHash, data.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return this.generateTokens(user);
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        }
        catch {
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
        const tokenValid = await argon2.verify(user.refreshTokenHash, refreshToken);
        if (!tokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return this.generateTokens(user);
    }
    async logout(userId) {
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
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });
        const refreshToken = await this.jwtService.signAsync({
            sub: user.id,
            tokenId: randomUUID(),
        }, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
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
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map