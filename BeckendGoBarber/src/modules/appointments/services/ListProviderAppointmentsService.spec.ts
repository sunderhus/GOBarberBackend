import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list all provider appointments in a day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppointments.execute({
      day: 20,
      month: 5,
      year: 2021,
      provider_id: 'provider',
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });

  it('should be able to list all provider appointments in a day from cache', async () => {
    const recoverFromCache = jest.spyOn(fakeCacheProvider, 'recover');
    const saveInCache = jest.spyOn(fakeCacheProvider, 'save');

    const availability = await listProviderAppointments.execute({
      day: 20,
      month: 4,
      year: 2022,
      provider_id: 'provider',
    });
    await listProviderAppointments.execute({
      day: 20,
      month: 4,
      year: 2022,
      provider_id: 'provider',
    });
    await listProviderAppointments.execute({
      day: 20,
      month: 4,
      year: 2022,
      provider_id: 'provider',
    });

    expect(availability).toEqual([]);
    expect(recoverFromCache).toBeCalledTimes(3);
    expect(saveInCache).toBeCalledTimes(1);
  });
});
