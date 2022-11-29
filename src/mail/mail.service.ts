import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetMail(email: string, name: string, pin: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password!',
      template: './templates/reset-password',
      context: {
        name,
        pin,
      },
    });
  }
}
