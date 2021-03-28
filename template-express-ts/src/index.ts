import express from 'express';

import { globalRouter } from '@/api/routes';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Global Routing */
globalRouter(app);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
