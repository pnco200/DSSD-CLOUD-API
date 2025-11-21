import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private getTransportConfig() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true';
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !pass) {
      this.logger.error('Faltan variables SMTP_HOST, SMTP_USER o SMTP_PASS para enviar correos');
      throw new InternalServerErrorException('Configuracion de correo no disponible');
    }

    return {
      transport: {
        host,
        port,
        secure,
        auth: { user, pass },
      },
      from,
    };
  }

  async send(options: SendMailOptions): Promise<void> {
    const config = this.getTransportConfig();
    const transporter = nodemailer.createTransport(config.transport);

    try {
      await transporter.sendMail({
        from: config.from,
        ...options,
      });
    } catch (error) {
      this.logger.error('No se pudo enviar el correo', error.stack);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
