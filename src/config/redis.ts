import Redis from 'ioredis';
import { REDIS_URI } from '../config';

const redis = new Redis(REDIS_URI);

redis.on('connect', () => {
  console.log('Redis is Connected');
});

redis.on('error', (err) => {
  console.log(`Error Connecting Redis Database ${err.address}:${err.port}`);
});

export default redis;
