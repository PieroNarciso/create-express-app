import express from 'express';

import { globalRouter } from './api/routes/index.js';
import { PORT } from './config/env.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

globalRouter(app);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
