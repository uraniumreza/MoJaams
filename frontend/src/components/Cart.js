import React from 'react';

const Cart = ({ cart, goBack, goNext, step }) => {
  return (
    <div className={`full-page ${step === 3 ? 'visible' : ''}`}>
      {step === 3 && (
        <>
          <h4 className="title">Your Order!</h4>
          <ol className="order-items-container">
            {Object.entries(cart).map(([id, orderItem]) => (
              <li className="order-item" key={id}>
                {`${orderItem.itemName} - ${orderItem.itemVariant} `}
                <strong>(x{orderItem.quantity})</strong>
              </li>
            ))}
          </ol>

          <div className="navigation-container">
            <button className="nav-btn back" onClick={goBack}>
              ADD MORE
            </button>
            <button className="nav-btn next" onClick={goNext}>
              CONFIRM
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
