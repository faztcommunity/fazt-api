import redis from '../config/redis';

const redisMiddleware: Handler = async (req, res, next) => {
  const url = req.url;
  const select = await selectDB(url);

  if (!select) return next();

  if (req.method !== 'GET') {
    await redis.flushdb();
    next();
    return;
  }

  const data = await redis.get(url);

  if (!data) {
    const send = res.send.bind(res);
    res.send = (body: any) => {
      (async () => {
        await redis.set(url, body);
        await redis.expire(url, 300);
      })();
      return send(body);
    };
    next();
    return;
  }

  const JSONdata = JSON.parse(data);
  return res.json(JSONdata).status(JSONdata.statusCode || 200);
};

enum routes {
  projects,
  users,
  tasks,
  bot,
  misc,
  jobs
}

async function selectDB(url: string) {
  url = url.split('/')[1];
  if (Object.keys(routes).includes(url)) {
    try {
      return await redis.select(routes[url as keyof typeof routes]);
    } catch (err) {
      return null;
    }
  }

  return null;
}

export default redisMiddleware;
