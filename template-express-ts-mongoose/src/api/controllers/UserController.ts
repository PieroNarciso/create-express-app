import { Request, Response } from 'express';

export const userController = {
  /**
   * Get /users
   *
   * Get All Users
   */
  getUsers: (_req: Request, res: Response) => {
    return res.send({ message: 'All Users Fetch' });
  },
};
