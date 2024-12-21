import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css'; // Đường dẫn đến tệp CSS toàn cục
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
