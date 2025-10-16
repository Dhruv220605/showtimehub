// Sports.js (should match the Movies layout)
import React from 'react';

function SportsCard({ event }) {
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

function Sports({ sportsData }) {
  return (
    <div className="app">
      <section className="recommended">
        <h2>Sports In Mumbai</h2>
        <div className="sports-tags">
          {sportsData.tags.map((tag, idx) => (
            <span className="tag" key={idx}>{tag}</span>
          ))}
        </div>
        <div className="movies-row">
          {sportsData.events.map((event, idx) => (
            <SportsCard event={event} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sports;
