import redis from 'redis';
import { promisify } from 'util';
import dotenv from 'dotenv';
import { log } from '../utils/logger';

dotenv.config();
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;
const env = process.env.NODE_ENV;
const url = env === 'production' ? process.env.REDIS_URL : '';

const client = redis.createClient({
    host,
    port,
    url,
});

client.on('ready', () => {
    log.info('Redis connected. OK');
});

client.on('error', (error) => {
    log.error(`Redis encountered an error while connecting: \n ${error}`);
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const delAsync = promisify(client.del).bind(client);
