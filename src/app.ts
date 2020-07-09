import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

import routes from './routes';

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// global variables

export default app;
