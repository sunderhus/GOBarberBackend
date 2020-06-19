import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12345',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345');
  });

  it('should not be able to create new appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const sameDate = new Date();

    await createAppointment.execute({
      date: sameDate,
      provider_id: '12345',
    });

    expect(
      createAppointment.execute({
        date: sameDate,
        provider_id: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
