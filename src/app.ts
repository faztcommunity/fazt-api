import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import { PORT } from './config';
import { swaggerSpec } from './config/swagger';

import routes from './routes';
import { handleError } from './middlewares/error.middleware';
import { handleNotFound } from './middlewares/not-found.middleware';

const app = express();

app.set('port', PORT);
app.set('json spaces', 4);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(handleError);
app.use(handleNotFound);

export default app;
