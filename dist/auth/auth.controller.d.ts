import { AuthenticationService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/request-with-user.interface';
import { UsersService } from 'src/users/users.service';
export declare class AuthenticationController {
    private readonly authenticationService;
    private readonly usersService;
    constructor(authenticationService: AuthenticationService, usersService: UsersService);
    register(registrationData: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    confirmEmail(token: string, id: string): Promise<string>;
    logIn(request: RequestWithUser): Promise<import("../users/entities/user.entity").default>;
    logOut(request: RequestWithUser): Promise<string>;
    authenticate(request: RequestWithUser): import("../users/entities/user.entity").default;
    refreshToken(request: RequestWithUser): import("../users/entities/user.entity").default;
}
