import { Document } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password?: string;
}

export interface UserDocument extends IUser, Document {}
