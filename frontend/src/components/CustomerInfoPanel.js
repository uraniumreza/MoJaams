import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CustomerInfoPanel = ({ request, step, placeOrder, goBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createOrder = () => {
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
      placeOrder(customerName, customerAddress);
    }
  };

  return (
    <div className={`full-page ${step === 4 ? 'visible' : ''}`}>
      {step === 4 && (
        <>
          <input
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="your name, please?"
            className="customer-info"
            autoComplete="true"
            autoFocus
          />
          <input
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="and the address to deliver your pizza?"
            className="customer-info"
            autoComplete="true"
          />

          <span className="error-label">{errorMessage}</span>

          <div className="navigation-container">
            <button className="nav-btn back" onClick={goBack}>
              BACK
            </button>
            <button className="nav-btn next" onClick={createOrder}>
              PLACE ORDER{' '}
              {request.loading && <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerInfoPanel;
