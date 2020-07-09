import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}
@injectable()
class EtherialMailProvider implements IMailProvider {
  private cliente: Transporter;

  constructor(
    @inject('TemplateMailProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.cliente = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.cliente.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'contato@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log(`Preview  ${nodemailer.getTestMessageUrl(message)}`);
  }
}
export default EtherialMailProvider;
