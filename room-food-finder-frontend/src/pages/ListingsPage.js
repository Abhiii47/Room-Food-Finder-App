import React, { useState } from 'react';
import '../styles/Listings.css';

const ListingsPage = () => {
  const [activeCard, setActiveCard] = useState(null); // 'food', 'room', or null

  const handleCardClick = (cardType) => {
    // If the same card is clicked, flip it back
    if (activeCard === cardType) {
      setActiveCard(null);
    } else {
      setActiveCard(cardType);
    }
  };

  const renderCardContent = (cardType) => {
    // If the card is not active, show the category title
    if (activeCard !== cardType) {
      return (
        <div className="card-front">
          <h3>{cardType === 'food' ? 'Food' : 'Room'}</h3>
          <p>{cardType === 'food' ? 'Find your next meal' : 'Find a place to stay'}</p>
        </div>
      );
    }

    // If the card is active, show the list
    if (cardType === 'food') {
      return (
        <div className="card-back">
          <h4>Food Listings</h4>
          <div className="list-container">
            <div className="list-item">List 1</div>
            <div className="list-item">List 2</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-back">
          <h4>Room Listings</h4>
          <div className="list-container">
            <div className="list-item">List 1</div>
            <div className="list-item">List 2</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="listings-container">
      <div className="container">
        <div className="map-section">
          <h2>MAP</h2>
          <div className="map-placeholder">
            <p>Google Maps will be displayed here</p>
          </div>
        </div>

        <div className="card-grid">
          <div
            className={`flip-card-container ${activeCard === 'food' ? 'flipped' : ''}`}
            onClick={() => handleCardClick('food')}
          >
            <div className="flip-card-inner">
              {renderCardContent('food')}
            </div>
          </div>

          <div
            className={`flip-card-container ${activeCard === 'room' ? 'flipped' : ''}`}
            onClick={() => handleCardClick('room')}
          >
            <div className="flip-card-inner">
              {renderCardContent('room')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;