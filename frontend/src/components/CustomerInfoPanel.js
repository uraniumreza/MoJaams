import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CustomerInfoPanel = ({ request, step, placeOrder, goBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearStates = () => {
    setCustomerAddress('');
    setCustomerName('');
  };

  const createOrder = async () => {
    if (!customerName.trim().length) {
      setErrorMessage(
        'Please input your name, atleast the nickname that we can use to communicate!',
      );
    } else if (!customerAddress.trim().length) {
      setErrorMessage(
        'Please input the delivery address, without it we cannot deliver your pizza!',
      );
    } else {
      setErrorMessage('');
      await placeOrder(customerName, customerAddress);
      clearStates();
    }
  };

  return (
    <div className={`full-page ${step === 4 ? 'visible' : ''}`}>
      {step === 4 && (
        <>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value.trim())}
            placeholder="your name, please?"
            className="customer-info"
            autoComplete="true"
            autoFocus
          />
          <input
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value.trim())}
            placeholder="and the address to deliver your pizza?"
            className="customer-info"
            autoComplete="true"
          />

          <span className="error-label">{errorMessage}</span>

          <div className="navigation-container">
            <button className="nav-btn back" onClick={goBack}>
              BACK
            </button>
            {customerName && customerAddress && (
              <button className="nav-btn next" onClick={createOrder}>
                PLACE ORDER{' '}
                {request.loading && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

CustomerInfoPanel.propTypes = {
  request: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }),
  step: PropTypes.number.isRequired,
  placeOrder: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default CustomerInfoPanel;
