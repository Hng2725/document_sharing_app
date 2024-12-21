import React from 'react';
import '../styles/Header.css';
import '../pages/Login.js';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Document Sharing PTIT</h1>
      </div>
      <nav className="navigation">
        <a href="/">Home</a>
        <a href="/documents">Documents</a>
        <a href="/upload">Upload</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
