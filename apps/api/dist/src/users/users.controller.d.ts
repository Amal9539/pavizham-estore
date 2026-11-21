import type { Request } from 'express';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
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
            name: string;
            email: string;
            phone: string | null;
            id: string;
            role: import("../../generated/prisma/enums.js").UserRole;
            createdAt: Date;
        };
    }>;
    getProfile(request: AuthenticatedRequest): Promise<{
        message: string;
        user: {
            name: string;
            email: string;
            phone: string | null;
            id: string;
            role: import("../../generated/prisma/enums.js").UserRole;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
}
export {};
