import { Router } from 'express';

import { userController } from '../controllers/UserController.js';


const userRouter = Router();

userRouter.get('/', userController.getUsers);

export { userRouter };

