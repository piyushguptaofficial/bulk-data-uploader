const Redis = require('ioredis');

const redis = new Redis({
    host: '172.21.207.8',
    port: '6379',
    maxRetriesPerRequest: 20,
});

redis.on('connect', () => {
    console.log('Redis connected');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redis;