import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentComponent from "./PaymentComponent";

// Import the complete movies data from App.js
const movies = [
  {
    id: 1,
    poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7q3w_bEwwcCtWx9PPjiYaflzRUH52WASlNlBtSi8TQ67JtiLhfygbPokYmlj2NFf9Twfy7DP18eHnJV_zbiykuF1yUwywibLJYXg4Tpvvhg",
    title: "Tron: Ares",
    genre: "Action/Adventure/Sci-Fi",
    rating: "7.8/10",
    votes: "1.6K+ Votes",
    promoted: true,
  },
  {
    id: 2,
    poster: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxPa706UOLbD7GoL8332E23b5IpOm2prAfVvJ6S-Wl4k9Xkg1msA5T83iqh-JXmhEd_mDdY1Uf2KUMsFayW3DBb-Nk77vLSZGjIIanvlt7",
    title: "Kantara: A Legend Chapter-1",
    genre: "Adventure/Drama/Thriller",
    rating: "9.3/10",
    votes: "330K+ Votes",
  },
  {
    id: 3,
    poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQc4AQQDRIBTvKdCPznmZV6aVWFhsal-gLFAOsnM5ZJGQCZKFY_96aJUDoEJVaN0H_cZ8imZKeEPHXIq6-hctzg3pern21_4bMV6FCh3qm26Q",
    title: "Avatar: The Way of Water",
    genre: "Action/Adventure/Fantasy",
    rating: "8.1/10",
    votes: "2.1M+ Votes",
    promoted: true,
  },
  {
    id: 4,
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    title: "Black Panther: Wakanda Forever",
    genre: "Action/Adventure/Drama",
    rating: "7.3/10",
    votes: "890K+ Votes",
  },
  {
    id: 5,
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    title: "Top Gun: Maverick",
    genre: "Action/Drama",
    rating: "8.3/10",
    votes: "1.2M+ Votes",
    promoted: true,
  },
  {
    id: 6,
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    title: "Spider-Man: No Way Home",
    genre: "Action/Adventure/Sci-Fi",
    rating: "8.2/10",
    votes: "1.8M+ Votes",
  },
  {
    id: 7,
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    title: "The Batman",
    genre: "Action/Crime/Drama",
    rating: "7.8/10",
    votes: "950K+ Votes",
  },
  {
    id: 8,
    poster: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    title: "Doctor Strange in the Multiverse of Madness",
    genre: "Action/Adventure/Fantasy",
    rating: "6.9/10",
    votes: "780K+ Votes",
  },
  {
    id: 9,
    poster: "data:image/jpeg;base64,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",
    title: "Thor: Love and Thunder",
    genre: "Action/Adventure/Comedy",
    rating: "6.3/10",
    votes: "650K+ Votes",
  },
  {
    id: 10,
    poster: "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
    title: "Jurassic World Dominion",
    genre: "Action/Adventure/Sci-Fi",
    rating: "5.6/10",
    votes: "420K+ Votes",
  }
];

// Seat selection component
function SeatSelection({ selectedSeats, onSeatSelect, maxSeats }) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  
  // Generate some random occupied seats for demo
  const occupiedSeats = ['A3', 'A4', 'B7', 'C1', 'C2', 'D5', 'E8', 'F3', 'G6', 'H2', 'H9'];
  
  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (seatId) => {
    const status = getSeatStatus(seatId);
    if (status === 'occupied') return;
    
    if (status === 'selected') {
      onSeatSelect(selectedSeats.filter(seat => seat !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Select Your Seats</h3>
      
      {/* Screen */}
      <div style={{
        background: '#333',
        color: 'white',
        textAlign: 'center',
        padding: '8px',
        marginBottom: '20px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        SCREEN
      </div>

      {/* Seat Map */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        {rows.map(row => (
          <div key={row} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ 
              width: '20px', 
              textAlign: 'center', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {row}
            </span>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatId = `${row}${i + 1}`;
              const status = getSeatStatus(seatId);
              
              return (
                <button
                  key={seatId}
                  onClick={() => handleSeatClick(seatId)}
                  disabled={status === 'occupied'}
                  style={{
                    width: '24px',
                    height: '24px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: status === 'occupied' ? 'not-allowed' : 'pointer',
                    background: status === 'occupied' ? '#ccc' : 
                               status === 'selected' ? '#ff6b6b' : '#fff',
                    color: status === 'occupied' ? '#999' : '#333',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title={status === 'occupied' ? 'Occupied' : 
                         status === 'selected' ? 'Selected' : 'Available'}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        marginTop: '16px',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#fff', border: '1px solid #ccc', borderRadius: '2px' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ff6b6b', border: '1px solid #ccc', borderRadius: '2px' }}></div>
          <span>Selected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ccc', border: '1px solid #ccc', borderRadius: '2px' }}></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}

export default function BookingTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => String(m.id) === id);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [count, setCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Check authentication status
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

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
          You need to be signed in to book tickets. Please sign in to continue with your booking.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleSignInRedirect}
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

  if (!movie) return <div>Movie not found</div>;

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (selectedSeats.length !== count) {
      alert(`Please select exactly ${count} seat${count > 1 ? 's' : ''}`);
      return;
    }
    
    // Prepare booking data and show payment
    const booking = {
      movieTitle: movie.title,
      selectedSeats: selectedSeats,
      totalPrice: totalPrice,
      showTime: new Date().toISOString(),
      movieId: movie.id
    };
    setBookingData(booking);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    // Get current user info
    const currentUser = localStorage.getItem('username');
    const currentUserId = localStorage.getItem('userId') || currentUser; // Use userId if available, fallback to username
    
    // Save booking to localStorage with user association
    const bookingId = paymentData.bookingId;
    const completeBooking = {
      ...bookingData,
      bookingId,
      paymentMethod: paymentData.paymentMethod,
      paymentStatus: 'success',
      bookingDate: new Date().toISOString(),
      userId: currentUserId,
      username: currentUser
    };

    // Get existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    existingBookings.push(completeBooking);
    localStorage.setItem('movieBookings', JSON.stringify(existingBookings));

    setSuccess(true);
    setTimeout(() => {
      navigate("/my-tickets");
    }, 2000);
  };

  const handleBackToSeats = () => {
    setShowPayment(false);
  };

  const totalPrice = selectedSeats.length * 150; // ₹150 per seat

  return (
    <div style={{maxWidth: 800, margin: "38px auto", padding: 32, background: "#f7f8fc", borderRadius: 14, boxShadow: "0 4px 15px #bbb6"}}>
      <h2>Book your ticket</h2>
      <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
        <img src={movie.poster} alt={movie.title} style={{width: "200px", height: "300px", objectFit: "cover", borderRadius: 12}} />
        <div style={{flex: 1}}>
          <div style={{fontWeight:600, fontSize: "1.3em", marginBottom: '8px'}}>{movie.title}</div>
          <div style={{color:"#888", marginBottom: '16px'}}>{movie.genre}</div>
          <div style={{fontSize: '14px', color: '#666'}}>
            <div>Date: Today, 7:30 PM</div>
            <div>Duration: 2h 15m</div>
            <div>Language: English</div>
          </div>
        </div>
      </div>

      {success ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <div style={{color:"green", fontWeight:"bold", fontSize:"1.2em", margin:"20px 0"}}>
            Payment successful! Booking confirmed 🎉
          </div>
          <div style={{fontSize: '14px', color: '#666', marginTop: '16px'}}>
            <div>Redirecting to your tickets...</div>
          </div>
        </div>
      ) : showPayment ? (
        <PaymentComponent
          bookingDetails={bookingData}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={handleBackToSeats}
        />
      ) : (
        <div>
          <form onSubmit={handleBook}>
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>
                Number of Tickets:
              </label>
              <select
                value={count}
                onChange={e => {
                  setCount(Number(e.target.value));
                  setSelectedSeats([]); // Reset seat selection when count changes
                }}
                style={{
                  borderRadius: 6, 
                  fontSize: "1em", 
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  background: "white"
                }}
              >
                {[...Array(10)].map((_,i)=>
                  <option key={i+1} value={i+1}>{i+1}</option>
                )}
              </select>
            </div>

            {count > 0 && (
              <SeatSelection 
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
                maxSeats={count}
              />
            )}

            {selectedSeats.length > 0 && (
              <div style={{
                background: '#f0f8ff',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #b3d9ff'
              }}>
                <div style={{fontWeight: '600', marginBottom: '8px'}}>Booking Summary:</div>
                <div style={{fontSize: '14px', color: '#666'}}>
                  <div>Selected Seats: {selectedSeats.join(', ')}</div>
                  <div>Price per seat: ₹150</div>
                  <div style={{fontWeight: '600', marginTop: '4px'}}>Total: ₹{totalPrice}</div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={selectedSeats.length !== count}
              style={{
                display:"block",
                background: selectedSeats.length === count ? "var(--accent)" : "#ccc",
                color:"#fff",
                border:"none",
                borderRadius:8,
                padding:"12px 0",
                marginTop:28,
                width:"100%",
                fontSize:"1.1em",
                fontWeight:700,
                cursor: selectedSeats.length === count ? "pointer" : "not-allowed"
              }}
            >
              {selectedSeats.length === count ? `Book Now - ₹${totalPrice}` : 
               selectedSeats.length === 0 ? 'Select Seats First' : 
               `Select ${count - selectedSeats.length} more seat${count - selectedSeats.length > 1 ? 's' : ''}`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
