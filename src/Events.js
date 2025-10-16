// Events.js
import React from 'react';

function EventCard({ event }) {
  return (
    <div className="movie-card">
      <div className="poster">
        <img src={event.image} alt={event.title} className="poster-img" />
        {event.promoted && <span className="promoted">PROMOTED</span>}
      </div>
      <div className="details">
        <span className="rating">{event.date}</span>
        <span className="votes">{event.type}</span>
      </div>
      <div className="title">{event.title}</div>
      <div className="genre">{event.venue}</div>
      <div className="genre">₹ {event.price}</div>
    </div>
  );
}

function RecommendedEvents({ eventsData }) {
  return (
    <section className="recommended">
      <h2>Events In Mumbai</h2>
      <div className="event-tags">
        {eventsData.tags.map((tag, idx) => (
          <span className="tag" key={idx}>{tag}</span>
        ))}
      </div>
      <div className="movies-row">
        {eventsData.events.map((event, idx) => (
          <EventCard event={event} key={idx} />
        ))}
      </div>
    </section>
  );
}

function Events({ eventsData }) {
  return (
    <div className="app">
      <RecommendedEvents eventsData={eventsData} />
    </div>
  );
}

export default Events;
