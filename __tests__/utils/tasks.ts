export async function createTask(request: any) {
  const task = {
    title: 'testing',
    description: 'This is a test.'
  };

  const { body, status } = await request.post('/').send(task);
  return { task, body, status };
}
