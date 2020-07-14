// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import * as swaggerDocument from './swagger.json';
import * as swaggerUi from 'swagger-ui-express';
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middlewares output
app.use(handleErrorMiddleware);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// global variables

// middlewares not found
app.use(function (req, res, next) {
    res.status(404).send('Not Found');
});

export default app;
