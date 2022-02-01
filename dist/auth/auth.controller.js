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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const refresh_jwt_guard_1 = require("./guards/refresh-jwt.guard");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, usersService) {
        this.authenticationService = authenticationService;
        this.usersService = usersService;
    }
    async register(registrationData) {
        return this.authenticationService.signup(registrationData);
    }
    async confirmEmail(token, id) {
        return this.authenticationService.confirmUserEmailWithToken(id, token);
    }
    async logIn(request) {
        const { user } = request;
        const jwtCookie = this.authenticationService.createToken(user.id);
        const refreshJwtCookie = this.authenticationService.createRefreshToken(user.id);
        request.res.setHeader('Set-Cookie', [jwtCookie, refreshJwtCookie]);
        return user;
    }
    async logOut(request) {
        request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        this.usersService.removeRefreshToken(request.user.id);
        return 'you are logged out';
    }
    authenticate(request) {
        const user = request.user;
        return user;
    }
    refreshToken(request) {
        const user = request.user;
        console.log(user);
        const accessTokenCookie = this.authenticationService.createToken(user.id);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('confirm-email/:token/:id'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "confirmEmail", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthenticationGuard),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logIn", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Post)('signout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.default),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "authenticate", null);
__decorate([
    (0, common_1.UseGuards)(refresh_jwt_guard_1.default),
    (0, common_1.Get)('refreshToken'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "refreshToken", null);
AuthenticationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService,
        users_service_1.UsersService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=auth.controller.js.map