import express from 'express';
import { default as supertest } from 'supertest';

function testServer(route: any) {
  const app = express();
  app.use(route);
  return supertest(app);
}

export default testServer;
