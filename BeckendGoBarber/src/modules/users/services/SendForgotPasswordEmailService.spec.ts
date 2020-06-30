import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/Providers/MailProvider/fakes/FakeMailProvider';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password using the user email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'joe doe',
      email: 'joedoe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joedoe@gmail.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'joedoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generated');

    const user = await fakeUserRepository.create({
      name: 'joe doe',
      email: 'joedoe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'joedoe@gmail.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
