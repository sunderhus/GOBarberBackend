import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/fakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the user email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUserRepository
    );
    await fakeUserRepository.create({
      name: 'joe doe',
      email: 'joedoe@gmail.com',
      password: '12345',
    });

    await sendForgotEmail.execute({
      email: 'joedoe@gmail.com',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    expect(sendMail).toBeCalled();
  });
});
