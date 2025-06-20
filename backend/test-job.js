const fileQueue = require('./queue');

const filePath = 'C:/Users/piyus/Downloads/test-job-file';

fileQueue.add(filePath)
.then(() => console.log("Test job added to queue"))
.catch((err) => console.error("Error adding test joh"));