import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinHearts, faGrinTears } from '@fortawesome/free-solid-svg-icons';

const PlaceOrderConfirmation = ({ step, placedOrder, goHome, goToCart }) => {
  return (
    <div className={`full-page ${step === 5 ? 'visible' : ''}`}>
      {step === 5 && (
        <>
          {placedOrder ? (
            <>
              <div className="confirmation-container success">
                <FontAwesomeIcon icon={faGrinHearts} size="3x" />
                <h3>
                  Congratulations! Your order ID - #
                  {placedOrder && placedOrder.id} has been placed successfully!
                </h3>
              </div>
              <button className="start-btn" onClick={goHome}>
                Go Home
              </button>
            </>
          ) : (
            <>
              <div className="confirmation-container error">
                <FontAwesomeIcon icon={faGrinTears} size="3x" />
                <h3>Sorry! We couldn't place your order for some reason!</h3>
              </div>
              <button className="start-btn" onClick={goToCart}>
                Try again!
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

PlaceOrderConfirmation.propTypes = {
  step: PropTypes.number.isRequired,
  placedOrder: PropTypes.shape({
    id: PropTypes.number,
  }),
  goHome: PropTypes.func.isRequired,
  goToCart: PropTypes.func.isRequired,
};

export default PlaceOrderConfirmation;
