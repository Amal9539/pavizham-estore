import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: CreateUserDto): Promise<{
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
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, data: UpdateProfileDto): Promise<{
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
    createAddress(userId: string, data: CreateAddressDto): Promise<{
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
    getAddresses(userId: string): Promise<{
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
