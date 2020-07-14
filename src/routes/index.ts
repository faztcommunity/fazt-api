// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';

import taskRoutes from './tasks.routes';
import projectsRoutes from './projects.routes';
import userRoutes from './users.routes';
import jobRoutes from './jobs.routes';
import discordRoutes from './discord.routes';
import indexRoutes from './index.routes';
import miscRoutes from './misc.routes';

const routes = Router();

routes.use('/', indexRoutes);
routes.use('/bot', discordRoutes);
// routes.use('/github', route);
// routes.use('/job', route);
routes.use('/misc', miscRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/projects', projectsRoutes);
routes.use('/users', userRoutes);
routes.use('/jobs', jobRoutes);

export default routes;
