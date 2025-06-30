const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const router = express.Router()


const uploadDirs = ['uploads/pdfs','uploads/videos'].forEach((dir) => {
  if(!fs.existsSync(dir)) {
   fs.mkdirSync(dir, {recursive: true});
  }
})


const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/pdfs'),
  filename: (req,file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const uploadPDF = multer({storage: pdfStorage})


//storage engine for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos'),
  filename: (req,file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const uploadVideo = multer({storage: videoStorage})

router.post('/pdf', uploadPDF.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ filePath: req.file.path });
});

//upload video

router.post('/video', uploadVideo.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ filePath: req.file.path });
});

module.exports = router;