import express from 'express';

const app = express();

import routes from './routes.js';

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3000);
