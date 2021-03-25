import { addDays, getDate, getDay, startOfHour } from 'date-fns';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list all provider month availability', async () => {
    const [currentMonth, currentDay, currentYear] = new Date()
      .toLocaleDateString('en')
      .split('/')
      .map(date => Number(date));

    const yesterday = getDate(addDays(new Date(), -1));

    const tomorrow = getDate(addDays(new Date(), 1));

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, currentDay, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123123',
      user_id: '4321',
      date: new Date(currentYear, currentMonth - 1, tomorrow, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: '123123',
      month: currentMonth,
      year: currentYear,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { available: false, day: yesterday },
        { available: false, day: currentDay },
        { available: true, day: tomorrow },
      ])
    );
  });
});
