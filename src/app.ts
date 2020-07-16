// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import * as swaggerDocument from './swagger.json';
import * as swaggerUi from 'swagger-ui-express';
import handleErrorMiddleware from './middlewares/error.middleware';
import redisMiddleware from './middlewares/redis.middleware';
import routes from './routes';
import apiKeyMiddleware from './middlewares/api-key.middleware';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares input
app.use(cors());
app.use(helmet());
app.use(morgan(process.env.LOG_MODE || 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiKeyMiddleware);
app.use(redisMiddleware);

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
  res.status(404).json({
    message: 'Not Found',
    path: req.url,
    statusCode: 404
  });
});

export default app;
