import mongoose from 'mongoose';

import { DB_URI } from '@/config/env';

const DB_OPTIONS: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

/**
 * DB Connection
 */
export default mongoose.connect(DB_URI as string, DB_OPTIONS, (err) => {
  if (err) console.log(err);
  else console.log('DB Connected');
});
