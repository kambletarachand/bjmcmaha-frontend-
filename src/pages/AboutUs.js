import React from 'react';
import Layout from '../components/Layout';
import '../styles/aboutus.css';

const AboutUs = () => {
  return (
    <Layout>
      <div className="aboutus-banner">
        <img
          src="/images/bjmc logo.webp"
          alt="BJMC Logo"
          className="aboutus-logo"
        />
        <div className="aboutus-content">
          <h1>About Us</h1>
          <h2>Vision, Mission & Our Journey</h2>
          <p>
            Bharatiya Janata Majdoor Cell Maharashtra is committed to the empowerment,
            organization, and representation of workers across Maharashtra. We stand
            for dignity in labor, equal opportunity, and the upliftment of underrepresented
            voices in the workforce.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
