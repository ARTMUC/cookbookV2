"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(registrationData) {
        const user = await this.usersService.checkIfUserExists(registrationData.email);
        if (user)
            throw new common_1.HttpException('User with that email already exists', common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        const createdUser = await this.usersService.create(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }));
        createdUser.password = undefined;
        return createdUser;
    }
    async getAuthenticatedUser(email, hashedPassword) {
        try {
            const user = await this.usersService.getByEmail(email);
            const isPasswordMatching = await bcrypt.compare(hashedPassword, user.password);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    createToken(userId) {
        const payload = { userId };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = this.configService.get('JWT_EXPIRATION_TIME');
        const token = this.jwtService.sign(payload, { secret: secret });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
    }
    getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map