import React from 'react';
import '../../../styles/adminStyles/eventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.eventDate}</p>

      {event.imagePaths && event.imagePaths.length > 0 && (
        <div className="event-images">
          {event.imagePaths.map((path, index) => (
            <img
              key={index}
              src={`http://localhost:8989${path.replace(/\\/g, '/')}`}
              alt={`event-img-${index}`}
              className="event-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
