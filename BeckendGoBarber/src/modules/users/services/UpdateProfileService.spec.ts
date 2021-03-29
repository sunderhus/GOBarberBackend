import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to update name and email', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joe Doe',
      email: 'joedoe@gmail.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@gmail.com');
  });

  it('should not be able to update to a email already taken by another user.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Matheus',
      email: 'mcs_sun@hotmail.com',
      password: '123123',
    });

    await fakeUserRepository.create({
      name: 'Priscila',
      email: 'pfelippetto@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: 'pfelippetto@gmail.com',
        oldPassword: user.password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the password to a new one, without send the current password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: '223311',
        oldPassword: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      password: 'newPassword',
      oldPassword: '123123',
    });
    expect(user.password).toBe('newPassword');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: user.name,
        email: user.email,
        password: 'newPassword',
        oldPassword: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password sending the wrong current password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: 'newPassword',
        oldPassword: '123321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
