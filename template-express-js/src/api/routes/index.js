/**
 * Global Import from Routes
 */
import express, { Router } from 'express';

import { userRouter } from './UserRouter.js';


/**
 * @param {express.Express} app
 */
export const globalRouter = (app) => {
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
  app.use('/', router);
  app.use('/user', userRouter);
};
