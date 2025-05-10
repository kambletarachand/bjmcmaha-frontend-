import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import LanguageSwitcher from './LanguageSwitcher'; // Import the LanguageSwitcher component

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/">
        <img src="/images/bjmc logo.webp" alt="BJMC Logo" className="logo-image" />
      </NavLink>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>

      <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/news" onClick={() => setMenuOpen(false)}>News</NavLink></li>
          <li><NavLink to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink></li>
          <li><NavLink to="/schemes" onClick={() => setMenuOpen(false)}>Schemes</NavLink></li>
          <li><NavLink to="/join" onClick={() => setMenuOpen(false)}>Join Us</NavLink></li>
          <li><NavLink to="/media" onClick={() => setMenuOpen(false)}>Media</NavLink></li>
         {/*} <li><NavLink to="/manifesto" onClick={() => setMenuOpen(false)}>Manifesto</NavLink></li>*/}
          <li><NavLink to="/donate" onClick={() => setMenuOpen(false)}>Donate</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>

      {/* Add LanguageSwitcher here */}
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
