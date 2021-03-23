import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let cacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    cacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      cacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '4321',
      provider_id: '12345',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345');
  });

  it('should not be able to create new appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    await createAppointment.execute({
      date: new Date(2020, 4, 11, 13),
      user_id: '4321',
      provider_id: '12345',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 13),
        user_id: '4321',
        provider_id: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment on a past date.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '4321',
        provider_id: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with same user as provider.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'same_User_id',
        provider_id: 'same_User_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment before 8:00 am or after 5:00 pm.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'same_User_id',
        provider_id: 'other_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: 'same_User_id',
        provider_id: 'other_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to send a notification to respective provider when a new job has been booked to him', async () => {
    const create = jest.spyOn(fakeNotificationsRepository, 'create');

    await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '4321',
      provider_id: '12345',
    });

    expect(create).toBeCalledWith({
      content: 'Novo agendamento para o dia 10/05/2020 às 13:00h',
      recipient_id: '12345',
    });
  });
});
