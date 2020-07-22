import router from '../../src/routes/jobs.routes';
import server from '../utils/server';
import { clearDatabase, closeDatabase, connect } from '../utils/dbHandler';

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Route - Jobs', () => {
  const request = server(router);
  it('Get list of Jobs', async () => {
    const result = await request.get('/');
    expect(result.status).toBe(200);
    expect(result.body.data).toEqual([]);
  });
});
