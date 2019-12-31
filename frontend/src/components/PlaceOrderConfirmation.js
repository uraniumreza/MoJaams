import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinHearts, faGrinTears } from '@fortawesome/free-solid-svg-icons';

const PlaceOrderConfirmation = ({ step, placedOrder, goHome }) => {
  return (
    <div className={`full-page ${step === 5 ? 'visible' : ''}`}>
      {step === 5 && (
        <>
          {placedOrder ? (
            <div className="confirmation-container success">
              <FontAwesomeIcon icon={faGrinHearts} size="3x" />
              <h3>
                Congratulations! Your order #{placedOrder && placedOrder.id} has
                been placed successfully!
              </h3>
            </div>
          ) : (
            <div className="confirmation-container error">
              <FontAwesomeIcon icon={faGrinTears} size="3x" />
              <h3>Sorry! We cannot place your order for some reason!</h3>
            </div>
          )}
          <button className="start-btn" onClick={goHome}>
            Go Home
          </button>
        </>
      )}
    </div>
  );
};

export default PlaceOrderConfirmation;
