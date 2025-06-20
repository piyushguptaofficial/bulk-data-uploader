// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const redis = require('./redis'); // ✅ Redis connection import
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 5000;


// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// 🔹 Serve uploaded files statically (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// 🔹 Redis test route
app.get('/test-redis', async (req, res) => {
  try {
    await redis.set('message', 'Hello from Redis!');
    const msg = await redis.get('message');
    res.send(`✅ Redis says: ${msg}`);
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).send('❌ Redis connection failed');
  }
});

// 🔹 File upload + CSV parse
app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, 'uploads', `${Date.now()}-${file.name}`);

  try {
    await file.mv(uploadPath);
    console.log('📁 File received:', uploadPath);

    // Parse CSV and store in memory
    const results = [];
    fs.createReadStream(uploadPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await redis.set('last_uploaded_file', file.name);
        res.json({
          message: 'File uploaded and parsed successfully!',
          data: results,
        });
      });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: 'File upload failed' });
  }
});

// 🔹 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
