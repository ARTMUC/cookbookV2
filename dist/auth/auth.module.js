"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const refresh_jwt_strategy_1 = require("./strategies/refresh-jwt.strategy");
const email_module_1 = require("../email/email.module");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            users_module_1.UsersModule,
            passport_1.PassportModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.register({}),
        ],
        providers: [
            auth_service_1.AuthenticationService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            refresh_jwt_strategy_1.RefreshJwtStrategy,
        ],
        controllers: [auth_controller_1.AuthenticationController],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=auth.module.js.map