import app from './app';
import { createConnection } from 'typeorm';

import { createRoles } from './utils/create.roles';

async function init() {
  try {
    const con = await createConnection();
    console.log('Postgres is Online');
    createRoles(con);

  } catch (err) {
    console.log('Error Creating Postgres Connection:', err.message);
  }

  app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}

init();
