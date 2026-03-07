import Redis from 'ioredis';
import { env } from './env';

export const redisConnection = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    maxRetriesPerRequest: null, // Req for BullMQ
});

redisConnection.on('error', (err) => {
    console.error('[Redis] Connection error:', err.message);
});

redisConnection.on('connect', () => {
    console.log(`[Redis] Connected to ${env.REDIS_HOST}:${env.REDIS_PORT}`);
});
