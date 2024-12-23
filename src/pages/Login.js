import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log({ data });
        if (data.success) {
          // Lưu username vào localStorage khi đăng nhập thành công
          localStorage.setItem('loggedInUser', username);
          window.location.href = "/";
        } else {
          alert("Tên đăng nhập hoặc mật khẩu không đúng");
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2 className="login-header">Đăng nhập</h2>
        <div className="login-form-group">
          <label htmlFor="username" className="login-label">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          className="login-button" 
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;