const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Cấu hình kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2005',
  database: 'document_sharing',
  port: '3307',
});

// Kết nối MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Đã kết nối MySQL!');
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint đăng ký
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Mã hóa mật khẩu
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

// Endpoint đăng nhập
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
        res.send('Đăng nhập thành công');
      } else {
        res.status(401).send('Mật khẩu không đúng');
      }
    }
  });
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
