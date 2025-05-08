import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
//import EventCard from '../components/admin/EventCard';
import EventCard from './AdminPages/EventPages/EventCard';
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

// Add "Our Events" and "All Events" tabs
const categoryNames = ['All Events', 'Our Events', ...Object.keys(staticEvents)];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [dynamicEvents, setDynamicEvents] = useState([]);

  useEffect(() => {
    console.log("Fetching Events");
    fetch('http://localhost:8989/api/admin/events')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Fetched events:", data); // ✅ See what’s coming back
        setDynamicEvents(data);
      })
      .catch(err => console.error('Failed to load dynamic events:', err));
  }, []);
  

  const getDisplayedEvents = () => {
    if (selectedCategory === 'All Events') {
      return [...Object.values(staticEvents).flat(), ...dynamicEvents];
    }

    if (selectedCategory === 'Our Events') {
      return dynamicEvents;
    }

    const staticList = staticEvents[selectedCategory] || [];
    const dynamicList = dynamicEvents.filter(event =>
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
          {categoryNames.map(category => (
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
            {getDisplayedEvents().map((event, index) =>
              event.id ? (
                <li key={event.id}>
                  <EventCard
                    event={event}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                </li>
              ) : (
                <li key={index} className="event-item">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-btn"
                    >
                      Know More
                    </a>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
