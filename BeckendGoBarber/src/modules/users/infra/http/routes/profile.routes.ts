import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const usersRouter = Router();
const profileController = new ProfileController();

usersRouter.patch('/profile', ensureAuthenticated, profileController.update);

export default usersRouter;
