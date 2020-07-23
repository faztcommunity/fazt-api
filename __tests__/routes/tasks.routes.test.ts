import router from '../../src/routes/tasks.routes';
import server from '../utils/server';
import { OK } from 'http-status-codes';

import { createTask } from '../utils/tasks';

const request = server(router);

describe('GET  /tasks', () => {
  it('Get Empty Array', async () => {
    const result = await request.get('/');
    expect(result.status).toBe(OK);
    expect(result.body.data).toEqual([]);
  });

  it('Get Array with Task', async () => {
    const { task } = await createTask(request);
    const { body, status } = await request.get('/');
    const [resTask] = body.data;

    expect(status).toBe(OK);
    expect(body.message).toBe('Ok!');
    expect(body.data).toHaveLength(1);
    expect(resTask.title).toEqual(task.title);
    expect(resTask.description).toEqual(task.description);
  });
});

describe('GET /tasks/:id', () => {
  it('Get Task', async () => {
    const { task: newTask } = await createTask(request);
    const {
      body: { data: tasks }
    } = await request.get('/');
    const {
      body: { data: task },
      status
    } = await request.get(`/${tasks[0]._id}`);

    expect(status).toBe(OK);
    expect(newTask.title).toEqual(task.title);
    expect(newTask.description).toEqual(task.description);
  });
});

describe('POST /tasks', () => {
  it('Create Taks', async () => {
    const { body, status } = await createTask(request);

    expect(status).toBe(OK);
    expect(body.message).toEqual('Task Created!');
    expect(body.data).toBeDefined();
  });
});

describe('PUT /tasks/:id', () => {
  it('PUT Task', async () => {
    const {
      body: { data: token }
    } = await createTask(request);
    const newTask = {
      title: 'New Testing',
      description: 'This is another test.'
    };
    const {
      body: { data: tasks }
    } = await request.get('/');
    const {
      body,
      status,
      body: { data: task }
    } = await request.put(`/${tasks[0]._id}`).send(newTask);

    expect(status).toBe(OK);
    expect(body.message).toEqual('Task Updated!');
    expect(body.data.title).toBe(newTask.title);
    expect(body.data.description).toBe(newTask.description);
  });
});

describe('DELETE /tasks/:id', () => {
  it('DELETE Task', async () => {
    const { task: newTask } = await createTask(request);
    const {
      body: { data: tasks }
    } = await request.get('/');
    const {
      body: { data: task },
      status,
      body
    } = await request.delete(`/${tasks[0]._id}`);

    expect(status).toBe(OK);
    expect(body.message).toEqual('Task Deleted!');
  });
});
