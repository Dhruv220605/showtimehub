import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    // Note: We keep movieBookings in localStorage so users can see their tickets when they sign back in
    window.location.href = "/";
  };

  const handleMyTickets = () => {
    navigate('/my-tickets');
  };

  return (
    <div className="auth-badge">
      {username ? (
        <>
          <button 
            onClick={handleMyTickets} 
            style={{
              background: 'none',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              marginRight: '8px'
            }}
            title="View your tickets"
          >
            🎫 My Tickets
          </button>
          <span className="username" title={username}>{username}</span>
          <button onClick={handleLogout} className="logout-btn" aria-label="Logout">Logout</button>
        </>
      ) : (
        <>
          <a className="auth-link-btn" href="/signup">Sign Up</a>
          <a className="auth-link-btn" href="/signin">Sign In</a>
        </>
      )}
    </div>
  );
}

export default Navbar;
