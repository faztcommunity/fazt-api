import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as swaggerDocument from './swagger.json';
import * as swaggerUi from 'swagger-ui-express';
import { PORT } from './config';

import routes from './routes';
import { handleError } from './middlewares/error.middleware';

const app = express();

app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(handleError);

export default app;
