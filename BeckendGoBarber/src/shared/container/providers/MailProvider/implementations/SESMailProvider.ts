import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}
@injectable()
class SESMailProvider implements IMailProvider {
  private cliente: Transporter;

  constructor(
    @inject('TemplateMailProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {}
}
export default SESMailProvider;
