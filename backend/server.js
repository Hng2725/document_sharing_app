const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// API routes
let documents = [];

app.get('/documents', (req, res) => {
  res.json(documents);
});

app.post('/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).send('File is required');
  }

  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const newDocument = { title, description, fileUrl };
  documents.push(newDocument);

  res.status(201).json(newDocument);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
