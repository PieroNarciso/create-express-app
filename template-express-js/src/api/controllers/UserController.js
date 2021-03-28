import express from 'express';

export const userController = {
  /**
   * Get /users
   *
   * @param {express.Request} _req
   * @param {express.Response} res
   */
  getUsers: (_req, res) => {
    return res.send({ message: 'All Users Fetch' });
  },
};
