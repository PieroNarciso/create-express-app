/**
 * Global Import from Routes
 */
import { Router, Express } from 'express';

import { userRouter } from './UserRouter';


export const globalRouter = (app: Express): void => {
  const router = Router();

  /**
   * Sample Route
   */
  router.get('/', (_req, res) => {
    return res.send('Hello World!');
  });

  /**
   * Import Other Routes
   */
  app.use('/user', userRouter);
};
