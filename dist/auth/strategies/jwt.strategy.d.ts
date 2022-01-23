import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import TokenPayload from '../interfaces/token-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(payload: TokenPayload): Promise<import("../../users/entities/user.entity").default>;
}
export {};
