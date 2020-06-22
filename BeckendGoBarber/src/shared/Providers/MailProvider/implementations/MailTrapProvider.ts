import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class MailTrapProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {}
}
export default MailTrapProvider;
