import type { Request } from 'express';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        sub: string;
        email: string;
        role: string;
    };
};
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: CreateUserDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../generated/prisma/enums.js").UserRole;
            createdAt: Date;
        };
    }>;
    getProfile(request: AuthenticatedRequest): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../generated/prisma/enums.js").UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    updateProfile(request: AuthenticatedRequest, body: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import("../../generated/prisma/enums.js").UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
    createAddress(request: AuthenticatedRequest, body: CreateAddressDto): Promise<{
        message: string;
        address: {
            id: string;
            phone: string;
            createdAt: Date;
            fullName: string;
            address: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            userId: string;
        };
    }>;
    getAddresses(request: AuthenticatedRequest): Promise<{
        message: string;
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            fullName: string;
            address: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            userId: string;
        }[];
    }>;
}
export {};
