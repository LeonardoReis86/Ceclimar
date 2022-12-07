import express from 'express';

import { registerSchedule } from './controllers/schedule.js';

const routes = express();

routes.post('/agendar', registerSchedule);

export default routes;
