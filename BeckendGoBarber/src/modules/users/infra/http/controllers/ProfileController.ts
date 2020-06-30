import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateProfile = container.resolve(UpdateProfileService);

      const { name, email, password, old_password } = request.body;
      const { id } = request.user;

      const user = await updateProfile.execute({
        user_id: id,
        name,
        email,
        password,
        old_password,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
