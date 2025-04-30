import React from 'react';
import Layout from '../components/Layout';
import '../styles/homepage.css'; // Custom CSS for homepage design

const HomePage = () => {
  return (
    <Layout>
      <div className="homepage-banner">
        <img
          src="/images/bjmc logo.webp"
          alt="BJMC Maharashtra Logo"
          className="homepage-logo"
        />
        <div className="homepage-content">
          <h1>Bharatiya janata Majdoor Cell Maharastra</h1>
          <h2>Maharashtra Chapter</h2>
          <p>
            Welcome to the official website of BJMC Maharashtra. Explore the latest news,
            events, media coverage, and resources dedicated to empowering journalism and
            mass communication education.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
