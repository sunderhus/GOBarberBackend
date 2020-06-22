import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute(data: IRequest): Promise<void> {
    console.log(data);
  }
}

export default SendForgotPasswordEmailService;
