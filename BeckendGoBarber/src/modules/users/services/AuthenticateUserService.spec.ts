import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import authConfig from '@config/auth';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to authenticate a User', async () => {
    const user = await createUser.execute({
      name: 'Matheus Sunderhus',
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to sign in without a user', async () => {
    await expect(
      authenticateUser.execute({
        email: '',
        password: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    await createUser.execute({
      name: 'Matheus Sunderhus',
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    await expect(
      authenticateUser.execute({
        email: 'matheus.sunderhus@gmail.com',
        password: '54321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to sign in without a valid jwt secret', async () => {
    authConfig.jwt = { secret: undefined, expiresIn: '' };

    await createUser.execute({
      name: 'Matheus Sunderhus',
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    await expect(
      authenticateUser.execute({
        email: 'matheus.sunderhus@gmail.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
