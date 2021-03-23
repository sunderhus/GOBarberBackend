import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list all providers', async () => {
    const providerUser1 = await fakeUsersRepository.create({
      name: 'jhon doe',
      email: 'test@gmail.com',
      password: '123123',
    });

    const providerUser2 = await fakeUsersRepository.create({
      name: 'jhon tre',
      email: 'test2@gmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({});

    expect(providers).toHaveLength(2);
    expect(providers).toEqual([providerUser1, providerUser2]);
  });

  it('should not be able to list non-existing providers', async () => {
    await expect(
      listProviders.execute({ user_id: 'non-existing-provider-id' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all  providers except the  logged in provider', async () => {
    const providerUser1 = await fakeUsersRepository.create({
      name: 'provider user 1',
      email: 'p1@gmail.com',
      password: '123123',
    });

    const providerUser2 = await fakeUsersRepository.create({
      name: 'provider user 2',
      email: 'p2@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@gmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).not.toHaveLength(3);
    expect(providers).toEqual([providerUser1, providerUser2]);
  });
  it('should be able to list all  providers except the  logged in provider from cache', async () => {
    const recoverFromCache = jest.spyOn(fakeCacheProvider, 'recover');
    const saveInCache = jest.spyOn(fakeCacheProvider, 'save');

    await fakeUsersRepository.create({
      name: 'provider user 1',
      email: 'p1@gmail.com',
      password: '123123',
    });

    await fakeUsersRepository.create({
      name: 'provider user 2',
      email: 'p2@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@gmail.com',
      password: '123123',
    });

    await listProviders.execute({ user_id: loggedUser.id });
    await listProviders.execute({ user_id: loggedUser.id });
    await listProviders.execute({ user_id: loggedUser.id });

    expect(saveInCache).toBeCalledTimes(1);
    expect(recoverFromCache).toBeCalledTimes(3);
  });
});
