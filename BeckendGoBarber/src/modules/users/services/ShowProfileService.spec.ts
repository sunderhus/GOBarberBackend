import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show a profile from a existing user', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'test@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: id });

    expect(profile).toHaveProperty('name', 'Jhon Doe');
    expect(profile).toHaveProperty('email', 'test@gmail.com');
  });

  it('should not  be able to show a profile from a non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
