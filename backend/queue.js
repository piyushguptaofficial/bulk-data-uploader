const Queue = require('bull');
const fileQueue = new Queue ('file-processing', 'redis://172.21.207.8',{
    redis : {
        host: '172.21.207.8', // WSL ka ip
        port: 6379,
    },
});

fileQueue.on('ready', () => {
    console.log("redis Queue Connected & Ready!");
});

// exports = fileQueue
module.exports = fileQueue;