// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import handleErrorMiddleware from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares input
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', routes);

// middlewares output
app.use(handleErrorMiddleware);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// global variables

export default app;
