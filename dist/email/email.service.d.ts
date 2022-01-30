import { MailerService } from '@nestjs-modules/mailer';
import User from 'src/users/entities/user.entity';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmationEmail(user: User): Promise<void>;
}
