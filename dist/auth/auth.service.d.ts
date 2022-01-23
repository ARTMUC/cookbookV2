import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    signup(registrationData: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    getAuthenticatedUser(email: string, hashedPassword: string): Promise<import("../users/entities/user.entity").default>;
    private verifyPassword;
    createToken(userId: string): string;
    getCookieForLogOut(): string;
}
