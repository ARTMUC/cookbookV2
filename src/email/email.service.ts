import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import User from 'src/users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmationEmail(user: User) {
    const token = 'test';
    const url = `example.com/auth/confirm?token=${token}`;
    const confirmationEmailText = `localhost:5000/api/v1/auth/confirm/${token}`;
    const confirmationEmailHTML = `<a href=\"http://localhost:5000/api/v1/auth/confirm/${token}\">Hello ${user.name} click here to confirm email </a>`;

    await this.mailerService.sendMail({
      // to: user.email,
      to: 'artmuc911@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to CookBook! Confirm your Email',
      text: confirmationEmailText,
      html: confirmationEmailHTML,
    });
  }
}
