import {Router} from 'express';

import { userController } from '@/api/controllers';


const userRouter = Router();

userRouter.get('/', userController.getUsers);

export { userRouter };

