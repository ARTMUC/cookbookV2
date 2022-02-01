import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly emailService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
    signup(registrationData: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    getAuthenticatedUser(email: string, plainPassword: string): Promise<import("../users/entities/user.entity").default>;
    createToken(userId: string): string;
    createRefreshToken(userId: string): string;
    confirmUserEmailWithToken(id: string, token: string): Promise<string>;
    getCookieForLogOut(): string[];
}
