// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

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

enum ERoutes {
  projects,
  users,
  tasks,
  bot,
  misc,
  jobs,
  github
}

async function selectDB(url: string) {
  url = url.split('/')[1];
  if (Object.keys(ERoutes).includes(url)) {
    try {
      return await redis.select(ERoutes[url as keyof typeof ERoutes]);
    } catch (err) {
      return null;
    }
  }

  return null;
}

export default redisMiddleware;
