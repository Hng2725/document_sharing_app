import React from 'react';
import { Mail, Facebook, Phone } from 'lucide-react';
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2024 Document Sharing PTIT. All rights reserved.</p>
        <div>
          <a href="mailto:contact@ptit.edu.vn">
            <Mail color="white" size={24} />
          </a>
          <a href="https://www.facebook.com/nguyen.viet.hung.674146/reels/" target="_blank" rel="noopener noreferrer">
            <Facebook color="white" size={24} />
          </a>
          <a href="">
            <Phone color="white" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;