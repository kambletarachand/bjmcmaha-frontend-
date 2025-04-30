import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css'; // Adjust the path if needed

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} BJMC Maharashtra. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/admin-login">Admin Login</Link>
        <Link to="/district-login">District Login</Link>
      </div>
    </footer>
  );
};

export default Footer;
