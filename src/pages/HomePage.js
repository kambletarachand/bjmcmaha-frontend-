import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next"; // ✅ Import

const HomePage = () => {
  const { t } = useTranslation(); // ✅ Hook

  return (
    <Layout>
      <div className="homepage-container">
        <section className="hero-section">
          <div className="hero-text">
            <h1>{t('home.title')}</h1>
            <p>{t('home.description')}</p>
            <Link to="/events" className="cta-button">
              {t('home.exploreEvents')}
            </Link>
          </div>
        </section>

        <section className="about-section">
          <h2>{t('home.aboutTitle')}</h2>
          <p>{t('home.aboutDescription')}</p>
        </section>

        <section className="news-section">
          <h2>{t('home.newsTitle')}</h2>
          <p>{t('home.newsDescription')}</p>
          <Link to="/news" className="cta-button secondary">
            {t('home.readNews')}
          </Link>
        </section>

        <section className="events-banner">
          <div className="events-content">
            <h1>{t('home.upcomingEvents')}</h1>
            <h2>{t('home.eventsSubtitle')}</h2>
            <p>{t('home.eventsDescription')}</p>
            <Link to="/events" className="cta-button">
              {t('home.viewAllEvents')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
