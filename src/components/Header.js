import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'; // Make sure this path is correct

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        setScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navigation">
        <Link to="/" className="logo-link">
          <img
            src="/images/bjmc logo.webp"
            alt="BJMC Logo"
            className="logo-image"
          />
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/news" className="nav-link">News</Link></li>
          <li><Link to="/events" className="nav-link">Events</Link></li>
          <li><Link to="/join" className="nav-link">Join Us</Link></li>
          <li><Link to="/media" className="nav-link">Media</Link></li>
          <li><Link to="/manifesto" className="nav-link">Manifesto</Link></li>
          <li><Link to="/donate" className="nav-link">Donate</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
