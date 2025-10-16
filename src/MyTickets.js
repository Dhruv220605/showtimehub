import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyTickets() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
      // Load bookings from localStorage and filter by current user
      const savedBookings = localStorage.getItem('movieBookings');
      if (savedBookings) {
        const allBookings = JSON.parse(savedBookings);
        // Filter bookings to only show current user's bookings
        const userBookings = allBookings.filter(booking => 
          booking.username === username || booking.userId === username
        );
        setBookings(userBookings);
      }
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '40px',
        textAlign: 'center',
        background: '#f7f8fc',
        borderRadius: '14px',
        boxShadow: '0 4px 15px #bbb6'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '16px' }}>⏳</div>
        <div>Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '40px',
        textAlign: 'center',
        background: '#f7f8fc',
        borderRadius: '14px',
        boxShadow: '0 4px 15px #bbb6'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2 style={{ marginBottom: '16px', color: '#333' }}>Sign In Required</h2>
        <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
          You need to be signed in to view your tickets. Please sign in to continue.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/signin')}
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'white',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.showTime);
    const now = new Date();
    
    if (filter === 'upcoming') return bookingDate > now;
    if (filter === 'past') return bookingDate < now;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBookingStatus = (booking) => {
    const bookingDate = new Date(booking.showTime);
    const now = new Date();
    
    if (bookingDate > now) {
      const diffHours = (bookingDate - now) / (1000 * 60 * 60);
      if (diffHours < 1) return { status: 'Starting Soon', color: '#ff6b6b' };
      return { status: 'Upcoming', color: '#4ecdc4' };
    }
    return { status: 'Completed', color: '#95a5a6' };
  };

  const downloadTicket = (booking) => {
    // Create a simple ticket format
    const ticketContent = `
BOOKMYSHOW TICKET
================

Booking ID: ${booking.bookingId}
Movie: ${booking.movieTitle}
Date & Time: ${formatDate(booking.showTime)}
Seats: ${booking.selectedSeats.join(', ')}
Amount Paid: ₹${booking.totalPrice}
Theater: Cineplex Multiplex
Screen: Screen 1

Thank you for choosing BookMyShow!
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (bookings.length === 0) {
    return (
      <div style={{
        maxWidth: 800,
        margin: '40px auto',
        padding: '40px',
        textAlign: 'center',
        background: '#f7f8fc',
        borderRadius: '14px',
        boxShadow: '0 4px 15px #bbb6'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎫</div>
        <h2 style={{ marginBottom: '12px', color: '#333' }}>No Bookings Yet</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          You haven't made any bookings yet. Start by exploring our movies!
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '16px' }}>My Tickets</h1>
        <div style={{ 
          fontSize: '14px', 
          color: '#666', 
          marginBottom: '16px',
          padding: '8px 12px',
          background: '#f0f8ff',
          borderRadius: '6px',
          border: '1px solid #b3d9ff'
        }}>
          📋 Showing tickets for: <strong>{localStorage.getItem('username')}</strong>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '20px',
              background: filter === 'all' ? 'var(--accent)' : 'white',
              color: filter === 'all' ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '20px',
              background: filter === 'upcoming' ? 'var(--accent)' : 'white',
              color: filter === 'upcoming' ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '20px',
              background: filter === 'past' ? 'var(--accent)' : 'white',
              color: filter === 'past' ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Past Bookings
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredBookings.map((booking, index) => {
          const statusInfo = getBookingStatus(booking);
          
          return (
            <div
              key={booking.bookingId}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#333' }}>
                    {booking.movieTitle}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    {formatDate(booking.showTime)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Booking ID: {booking.bookingId}
                  </div>
                </div>
                <div style={{
                  background: statusInfo.color,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {statusInfo.status}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>SEATS</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    {booking.selectedSeats.join(', ')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>AMOUNT</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    ₹{booking.totalPrice}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>THEATER</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    Cineplex Multiplex
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>SCREEN</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    Screen 1
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => downloadTicket(booking)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  📥 Download Ticket
                </button>
                {statusInfo.status === 'Upcoming' && (
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      background: 'var(--accent)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    🎬 View Details
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
          <h3>No {filter} bookings found</h3>
          <p>Try selecting a different filter or make a new booking.</p>
        </div>
      )}
    </div>
  );
}
