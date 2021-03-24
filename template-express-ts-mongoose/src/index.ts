import express from 'express';

import { globalRouter } from '@/api/routes';
import { PORT } from '@/config/env';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// DB
import '@/config/db';

/** Global Routing */
globalRouter(app);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
