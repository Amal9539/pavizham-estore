import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        sub: string;
        email: string;
        role: string;
    };
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto, response: Response): Promise<{
        message: string;
        accessToken: string;
    }>;
    refresh(request: Request, response: Response): Promise<{
        message: string;
        accessToken: string;
    }>;
    logout(request: AuthenticatedRequest, response: Response): Promise<{
        message: string;
    }>;
}
export {};
