import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").default>;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateUserDto: UpdateUserDto): any;
    remove(id: string): any;
}
