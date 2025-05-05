import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { BASE_URL } from '../utils/constants';
import '../styles/news.css';

const NewsPage = () => {
  const [externalNews, setExternalNews] = useState([]);
  const [internalNews, setInternalNews] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/external-news`)
      .then(res => setExternalNews(res.data))
      .catch(err => console.error('Error loading external news:', err));

    axios.get(`${BASE_URL}/internal-news`)
      .then(res => setInternalNews(res.data))
      .catch(err => console.error('Error loading internal news:', err));
  }, []);

  return (
    <Layout>
      <div className="news-page">
        <h1>Latest News</h1>

        <section className="news-section">
          <h2>From National & Labor News Sources</h2>
          <ul className="news-list">
            {externalNews.map((item, index) => (
              <li key={index} className="news-item">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="news-section">
          <h2>BJMC Announcements & Updates</h2>
          <div className="internal-news-grid">
            {internalNews.map((news) => (
              <div key={news.id} className="internal-news-card">
                {news.imageUrl && (
                  <img src={news.imageUrl} alt={news.title} className="news-thumbnail" />
                )}
                <div className="news-info">
                  <h3>{news.title}</h3>
                  <p>{news.content.substring(0, 120)}...</p>
                  <p className="news-meta">By {news.author} on {new Date(news.createdAt).toLocaleDateString()}</p>
                  <a href={`/news/${news.id}`} className="read-more">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NewsPage;
