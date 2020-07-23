// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Router } from 'express';

import taskRoutes from './tasks.routes';
import projectsRoutes from './projects.routes';
import userRoutes from './users.routes';
import jobRoutes from './jobs.routes';
import discordRoutes from './discord.routes';
import indexRoutes from './index.routes';
import miscRoutes from './misc.routes';
import newsRoutes from './news.routes';
import githubRoutes from './github.routes';

const routes = Router();

routes.use('/', indexRoutes);
routes.use('/projects', projectsRoutes);
routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/jobs', jobRoutes);
routes.use('/bot', discordRoutes);
routes.use('/news', newsRoutes);
routes.use('/misc', miscRoutes);
routes.use('/github', githubRoutes);

export default routes;
