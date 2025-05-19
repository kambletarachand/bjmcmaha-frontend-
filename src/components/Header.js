import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutVisitor } from '../redux/slices/visitorSlice';
import '../styles/header.css';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visitor, isAuthenticated } = useSelector((state) => state.visitor);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutVisitor());
    navigate('/login');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/">
        <img src="/images/bjmc logo.webp" alt="BJMC Logo" className="logo-image" />
      </NavLink>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">☰</button>

      <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={toggleMenu}>About</NavLink></li>
          <li><NavLink to="/news" onClick={toggleMenu}>News</NavLink></li>
          <li><NavLink to="/events" onClick={toggleMenu}>Events</NavLink></li>
          <li><NavLink to="/schemes" onClick={toggleMenu}>Schemes</NavLink></li>
          <li><NavLink to="/join" onClick={toggleMenu}>Join Us</NavLink></li>
          <li><NavLink to="/media" onClick={toggleMenu}>Media</NavLink></li>
          <li><NavLink to="/donate" onClick={toggleMenu}>Donate</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
        </ul>
      </nav>

      {/* ✅ Language + Login Section */}
      <div className="header-right">
        <LanguageSwitcher />
        {isAuthenticated ? (
          <div className="auth-info">
            <span className="welcome-text">Hi, {visitor?.contactDetails?.name || visitor?.email}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <NavLink className="login-button" to="/login" onClick={toggleMenu}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
