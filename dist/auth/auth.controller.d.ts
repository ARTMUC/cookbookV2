import { AuthenticationService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/request-with-user.interface';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registrationData: RegisterDto): Promise<import("../users/entities/user.entity").default>;
    logIn(request: RequestWithUser): Promise<import("../users/entities/user.entity").default>;
    logOut(request: RequestWithUser): Promise<string>;
    authenticate(request: RequestWithUser): import("../users/entities/user.entity").default;
}
