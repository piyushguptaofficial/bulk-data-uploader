// routes/upload.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fileQueue = require("../queue");

const router = express.Router();

// Ensure the uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Route: POST /api/upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    console.log("📁 File received:", filePath);

    // Add file to Redis Queue
    await fileQueue.add(filePath); // Directly pushing filepath

    res.status(200).json({ message: "File uploaded and added to queue" });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "Failed to upload file" });
  }
});

module.exports = router;

















// PREVIOUSE CODE BEFORE UPDATING 

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const fileQueue = require('../queue');

// const router = express.Router();

// // Storage Config
// const storage = multer.diskStorage({ // batata hai kaise aur kaha file store hogi
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // yahi folder use ho raha
//   },
//   filename: function (req, file, cb) {     // filename har file to unique naam de rha(timestamp)
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // File Filter (Optional: Only CSV or Excel)
// const fileFilter = (req, file, cb) => {        // yaha file type check karega aur uske hisab se usko allow krega
//   const allowedTypes = ['.csv', '.xlsx'];
//   const ext = path.extname(file.originalname);
//   if (allowedTypes.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only CSV and Excel files are allowed'), false);
//   }
// };

// // Multer Middleware
// const upload = multer({ storage, fileFilter });

// // Upload Route
// router.post('/', upload.single('file'), async(req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   await fileQueue.add({
//     file: req.file.path,
//     originalName: req.file.originalname,
//   }); // add file to queue

// //   console.log('Uploaded File:', req.file.filename);

//   res.json({
//     message: 'File uploaded successfully',
//     filename: req.file.filename,
//     path: req.file.path,
//   });
// });

// module.exports = router;
