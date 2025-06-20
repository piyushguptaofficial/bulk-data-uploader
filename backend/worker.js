const fileQueue = require('./queue');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require("xlsx");
const redis = require('redis');

console.log("👷 Worker started... waiting for jobs...");

fileQueue.process(async (job) => {
  try {
    const filePath = job.data;
    console.log("📥 Got a job! File to process:", filePath);

    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => results.push(row))
        .on('end', () => {
          console.log("✅ Processed rows:", results.length);
          resolve({ rows: results.length });
        })
        .on('error', (err) => {
          console.error("❌ Error reading CSV:", err);
          reject(err);
        });
    });

  } catch (err) {
    console.error("❌ Error in job processing", err);
    throw err;
  }
});












// const fileQueue = require('./queue');
// const fs = require('fs');
// const csv = require('csv-parser'); // npm install csv-parser
// const xlsx = require("xlsx");
// // const { fileQueue} = require('./queue');
// const redis = require('redis');

// console.log("Worker starte... waiting for jobs...");

// fileQueue.process(async (job) =>{
//     const filePath = job.data; //assuming job.data = {filePath: '...'}
//     console.log("Got a Job", job.data);
    
//     console.log(`Processing file: ${filePath}`);

//     return new Promise((resolve, reject) =>{
//         const results = [];
//         fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (row) => results.push(row))
//         .on('end', () => {
//             console.log("Processes rows:", results.length);
//             resolve({ rows: results.length });
//         })
//         .on('error', reject);
//     });
// });