import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'Matheus Sunderhus',
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User, with a email already taken.', async () => {
    await createUser.execute({
      name: 'Matheus Sunderhus',
      email: 'matheus.sunderhus@gmail.com',
      password: '12345',
    });

    await expect(
      createUser.execute({
        name: 'jhon doe',
        email: 'matheus.sunderhus@gmail.com',
        password: '183792371',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
