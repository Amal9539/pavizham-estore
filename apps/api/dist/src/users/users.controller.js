var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, Get, Patch, UseGuards, Req, Param, } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(body) {
        return this.usersService.createUser(body);
    }
    async getProfile(request) {
        return this.usersService.getProfile(request.user.sub);
    }
    async updateProfile(request, body) {
        return this.usersService.updateProfile(request.user.sub, body);
    }
    async createAddress(request, body) {
        return this.usersService.createAddress(request.user.sub, body);
    }
    async getAddresses(request) {
        return this.usersService.getAddresses(request.user.sub);
    }
    async updateAddress(request, addressId, body) {
        return this.usersService.updateAddress(request.user.sub, addressId, body);
    }
};
__decorate([
    Post('register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    UseGuards(AccessTokenGuard),
    Get('me'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    UseGuards(AccessTokenGuard),
    Patch('me'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    UseGuards(AccessTokenGuard),
    Post('addresses'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAddress", null);
__decorate([
    UseGuards(AccessTokenGuard),
    Get('addresses'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAddresses", null);
__decorate([
    UseGuards(AccessTokenGuard),
    Patch('addresses/:id'),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAddress", null);
UsersController = __decorate([
    Controller('users'),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map