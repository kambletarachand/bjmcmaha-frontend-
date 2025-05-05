import React from 'react';
import Layout from '../components/Layout';
import '../styles/bjmcNational.css';  // Ensure CSS matches this filename and path

const BJMCNational = () => {
  return (
    <Layout>
      <div className="bjmc-national-banner">
        <img
          src="/images/bjmc logo.webp"
          alt="BJMC National Logo"
          className="bjmc-national-logo"
        />
        <div className="bjmc-national-content">
          <h1>Bharatiya Janata Majdoor Cell (BJMC) - National</h1>
          <p>
            Bharatiya Janata Majdoor Cell (BJMC) is the labor wing of the Bharatiya Janata Party, working towards the empowerment and betterment of workers across India.
            With a vision of creating a strong and united workforce, BJMC aims to represent and safeguard the rights of workers, ensuring that their voices are heard in the political, social, and economic domains of the country.
          </p>

          <h2>Vision</h2>
          <p>
            To empower and unite workers across India by promoting their rights, ensuring their welfare, and establishing a sustainable workforce within India’s growing economy.
          </p>

          <h2>Mission</h2>
          <p>
            To regulate, support, and strengthen trade unions, ensuring their legal protection, immunity, and the voice of labor in policy-making decisions across the country.
          </p>

          <h2>Aim</h2>
          <ul>
            <li>To provide legal recognition and support to trade unions across India.</li>
            <li>To facilitate the formation of strong, transparent, and accountable unions.</li>
            <li>To ensure the safety, security, and rights of workers, both legally and socially.</li>
            <li>To work towards the empowerment of every worker through training and skill development programs.</li>
          </ul>

          <h2>History & Leadership</h2>
          <p><strong>Established in 2016</strong>, Bharatiya Janata Majdoor Cell (BJMC) is the world’s largest workers-based organization.</p>

          <div className="leader-entry">
            <img src="/images/arnab-chatterjee.jpg" alt="Arnab Chatterjee" className="leader-photo" />
            <div>
              <h3>2016 - Founded</h3>
              <p>Founded in 2016. First National President: <strong>Arnab Chatterjee</strong>.</p>
            </div>
          </div>

          <div className="leader-entry">
            <img src="/images/arnab-chatterjee.jpg" alt="Arnab Chatterjee" className="leader-photo" />
            <div>
              <h3>2025 - National President</h3>
              <p><strong>Arnab Chatterjee</strong> is the current National President of BJMC.</p>
            </div>
          </div>

          <div className="leader-entry">
            <img src="/images/biswapriya-roy.jpg" alt="Biswapriya Roy Choudhury" className="leader-photo" />
            <div>
              <h3>2025 - National Chairman</h3>
              <p><strong>Biswapriya Roy Choudhury</strong> is the National Chairman of BJMC.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BJMCNational;
