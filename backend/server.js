const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2005',
  database: 'document_sharing',
  port: '3307',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Đã kết nối MySQL!');
});

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

// Document storage
let documents = [];

// Document routes
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

// Authentication routes
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi đăng ký');
    } else {
      res.send('Đăng ký thành công');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi đăng nhập');
    } else if (results.length === 0) {
      res.status(401).send('Tên đăng nhập không tồn tại');
    } else {
      const user = results[0];
      // So sánh mật khẩu
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).send({ success: true, messge: "Đăng nhập thành công" });
      } else {
        res.status(401).send("Mật khẩu không đúng");
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});