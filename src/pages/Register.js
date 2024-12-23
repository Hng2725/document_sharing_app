import React, { useState } from 'react';
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Đăng ký không thành công');
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        alert('Đăng ký thất bại, vui lòng thử lại');
      });
  };

  return (
    <div className="register-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <h2>Đăng ký</h2>
        <input
          type="text"
          placeholder="Tên tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
