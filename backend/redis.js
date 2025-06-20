const Redis = require('ioredis');

const redis = new Redis('rediss://default:Acd9AAIjcDEzN2IzYmY5YzUxZTE0NTQyYTY2MmI3ODMyYmNjZTNmM3AxMA@topical-tomcat-51069.upstash.io:6379');

redis.on('connect', () => {
    console.log('Redis connected');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redis;