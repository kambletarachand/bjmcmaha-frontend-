import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialRegister from './SocialRegister'; // Imported new component
import '../styles/layout.css';

const getTitleFromPath = (pathname) => {
  const titles = {
    '': 'Home',
    about: 'About Us',
    news: 'News',
    events: 'Events',
    join: 'Join Us',
    media: 'Media',
    manifesto: 'Manifesto',
    donate: 'Donate',
    contact: 'Contact',
    'admin-login': 'Admin Login',
    'district-login': 'District Login',
    register: 'Register',
    schemes: 'Government Schemes', // ✅ Added title mapping
  };

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  return titles[lastSegment] || lastSegment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const Layout = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="layout">
      {/* Social Media + Register Section */}
      <SocialRegister />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            {pathSegments.map((seg, idx) => {
              const path = '/' + pathSegments.slice(0, idx + 1).join('/');
              const isLast = idx === pathSegments.length - 1;
              return (
                <span key={path}>
                  {' / '}
                  {isLast ? (
                    <span>{getTitleFromPath(path)}</span>
                  ) : (
                    <Link to={path}>{getTitleFromPath(path)}</Link>
                  )}
                </span>
              );
            })}
          </nav>

          {/* Title */}
          <h2>{getTitleFromPath(location.pathname)}</h2>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
