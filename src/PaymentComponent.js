import React, { useState } from 'react';

export default function PaymentComponent({ bookingDetails, onPaymentSuccess, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [upiId, setUpiId] = useState('');
  const [walletSelected, setWalletSelected] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiryDate') {
      // Format expiry date MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow 3 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingId = `BMS${Date.now().toString().slice(-6)}`;
      const paymentData = {
        bookingId,
        paymentMethod,
        amount: bookingDetails.totalPrice,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
      onPaymentSuccess(paymentData);
      setProcessing(false);
    }, 2000);
  };

  const isPaymentValid = () => {
    if (paymentMethod === 'card') {
      return cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
             cardDetails.expiryDate.length === 5 &&
             cardDetails.cvv.length === 3 &&
             cardDetails.cardName.trim().length > 0;
    } else if (paymentMethod === 'upi') {
      return upiId.includes('@') && upiId.length > 5;
    } else if (paymentMethod === 'wallet') {
      return walletSelected !== '';
    }
    return false;
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '20px auto',
      padding: '32px',
      background: '#f7f8fc',
      borderRadius: '14px',
      boxShadow: '0 4px 15px #bbb6'
    }}>
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Payment Details</h2>
      
      {/* Booking Summary */}
      <div style={{
        background: '#f0f8ff',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Booking Summary</h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <div><strong>Movie:</strong> {bookingDetails.movieTitle}</div>
          <div><strong>Seats:</strong> {bookingDetails.selectedSeats.join(', ')}</div>
          <div><strong>Show Time:</strong> Today, 7:30 PM</div>
          <div><strong>Total Amount:</strong> ₹{bookingDetails.totalPrice}</div>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        {/* Payment Method Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>
            Select Payment Method:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '8px' }}
              />
              💳 Credit/Debit Card
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '8px' }}
              />
              📱 UPI Payment
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '8px' }}
              />
              💰 Digital Wallet
            </label>
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Card Details</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Card Number:
                </label>
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                    Expiry Date:
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                    CVV:
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    placeholder="123"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Cardholder Name:
                </label>
                <input
                  type="text"
                  value={cardDetails.cardName}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cardName: e.target.value }))}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === 'upi' && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>UPI Details</h3>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                UPI ID:
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        )}

        {/* Wallet Selection */}
        {paymentMethod === 'wallet' && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Select Wallet</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map(wallet => (
                <label key={wallet} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="wallet"
                    value={wallet}
                    checked={walletSelected === wallet}
                    onChange={(e) => setWalletSelected(e.target.value)}
                    style={{ marginRight: '8px' }}
                  />
                  {wallet}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Back to Seats
          </button>
          <button
            type="submit"
            disabled={!isPaymentValid() || processing}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              background: isPaymentValid() && !processing ? 'var(--accent)' : '#ccc',
              color: 'white',
              cursor: isPaymentValid() && !processing ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {processing ? 'Processing...' : `Pay ₹${bookingDetails.totalPrice}`}
          </button>
        </div>
      </form>
    </div>
  );
}
