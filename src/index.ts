import app from './app';
import { createConnection } from 'typeorm';

import { createData } from './utils/initial-setup';

async function init() {
  try {
    const con = await createConnection();
    console.log('Postgres is Online');
    createData(con);

  } catch (err) {
    console.log('Error Creating Postgres Connection:', err.message);
  }

  app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}

init();
