

// News.js
import React from 'react';
import Layout from '../components/Layout';
import '../styles/news.css';

const News = () => {
  return (
    <Layout>
      <div className="section-banner">
        <div className="section-content">
          <h1>News</h1>
          <h2>Latest News and Announcements</h2>
          <p>Read the most recent updates, announcements and developments from BJMC Maharashtra.</p>
        </div>
      </div>
    </Layout>
  );
};

export default News;