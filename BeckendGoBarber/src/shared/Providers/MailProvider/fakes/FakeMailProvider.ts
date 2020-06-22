import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private emails: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.emails.push({
      to,
      body,
    });
  }
}
export default FakeMailProvider;
