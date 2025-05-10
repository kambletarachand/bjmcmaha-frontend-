import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="homepage-container">
        <section className="hero-section">
          <div className="hero-text">
            <h1>Welcome to Bharatiya Janata Majdoor Cell Maharashtra</h1>
            <p>
              Empowering the labour force of Maharashtra through progressive
              policies, education, and events. Join the movement for worker
              rights and development.
            </p>
            <Link to="/events" className="cta-button">
              Explore Events
            </Link>
          </div>
        </section>

        <section className="about-section">
          <h2>About Us</h2>
          <p>
            The Bharatiya Janata Majdoor Cell is dedicated to protecting the
            rights of workers, conducting awareness campaigns, organizing
            celebrations for key labour milestones, and supporting development
            initiatives throughout Maharashtra.
          </p>
        </section>

        <section className="news-section">
          <h2>Latest News</h2>
          <p>
            Stay informed on recent achievements, political decisions, and
            worker welfare schemes. Read updates on rallies, policies, and
            speeches by key leaders.
          </p>
          <Link to="/news" className="cta-button secondary">
            Read News
          </Link>
        </section>

        <section className="events-banner">
          <div className="events-content">
            <h1>Upcoming Events</h1>
            <h2>Celebrations | Achievements | Awareness Drives</h2>
            <p>
              Be a part of events that celebrate the strength and success of
              workers—from May Day rallies and milestone celebrations to skill
              workshops and legal aid camps.
            </p>
            <Link to="/events" className="cta-button">
              View All Events
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
