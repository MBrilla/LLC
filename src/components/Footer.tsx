import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} LLC 671. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 