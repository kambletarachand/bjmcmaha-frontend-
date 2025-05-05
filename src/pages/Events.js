import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/events.css';

const staticEvents = {
  Celebrations: [
    {
      title: 'Labour Day Celebration',
      description: 'Grand event honoring workers with speeches, music, and food.',
    },
    {
      title: 'BJP Foundation Day',
      description: 'Cultural programs and party leadership speeches on foundation day.',
    },
  ],
  Achievements: [
    {
      title: 'Minimum Wage Policy Passed',
      description: 'Celebrating the successful passage of minimum wage legislation.',
    },
    {
      title: 'Resolved Factory Dispute',
      description: 'Negotiated agreement benefiting over 300 workers.',
    },
  ],
  Workshops: [
    {
      title: 'Worker Safety Workshop',
      description: 'Training on safety regulations and emergency procedures.',
    },
  ],
  Rallies: [
    {
      title: 'Protest for Social Security',
      description: 'Demonstration demanding pension and medical benefits.',
    },
  ],
  Meetings: [
    {
      title: 'Public Consultation on Labor Policy',
      description: 'Discussion with citizens and leaders on new labor policy drafts.',
    },
  ],
};

const categoryNames = ['All Events', ...Object.keys(staticEvents)];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [dynamicEvents, setDynamicEvents] = useState([]);

  useEffect(() => {
    fetch('/api/internal-news') // or /api/events depending on your backend route
      .then(res => res.json())
      .then(data => setDynamicEvents(data))
      .catch(err => console.error('Failed to load events:', err));
  }, []);

  // Combine filtered static + dynamic events based on category
  const getDisplayedEvents = () => {
    const staticList = selectedCategory === 'All Events' 
      ? Object.values(staticEvents).flat() 
      : staticEvents[selectedCategory] || [];

    const dynamicList = selectedCategory === 'All Events'
      ? dynamicEvents
      : dynamicEvents.filter(event => 
          event.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

    return [...staticList, ...dynamicList];
  };

  return (
    <Layout>
    <div className="events-page">
      <div className="events-banner">
        <div className="events-content">
          <h1>Events by BJ Majdoor Cell Maharashtra</h1>
          <p>
            Stay informed about our celebrations, achievements, and worker-focused events. Empowering laborers through activism, knowledge, and unity.
          </p>
          <button className="cta-button">Join the Movement</button>
        </div>
      </div>

      <div className="event-category-tabs">
        {categoryNames.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="events-list">
        <h2>{selectedCategory}</h2>
        <ul className="event-item-list">
          {getDisplayedEvents().map((event, index) => (
            <li key={index} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {event.link && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-btn">
                  Know More
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </Layout>
  );

};

export default Events;
