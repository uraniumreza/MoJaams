import React from 'react';

const Cart = ({
  cart,
  editOrderItem,
  removeFromCart,
  goBack,
  goNext,
  step,
}) => {
  return (
    <div className={`full-page ${step === 3 ? 'visible' : ''}`}>
      {step === 3 && (
        <>
          <h4 className="title">Your Order!</h4>
          <div className="order-items-container">
            {Object.entries(cart).map(([id, orderItem]) => (
              <div className="order-item" key={id}>
                <span className="name">
                  {`${orderItem.itemName} - ${orderItem.itemVariant} `}
                  <strong>(x{orderItem.quantity})</strong>
                </span>
                <div>
                  <button key="update" onClick={() => editOrderItem(id)}>
                    UPDATE
                  </button>
                  <button key="delete" onClick={() => removeFromCart(id)}>
                    DELETE
                  </button>
                </div>
              </div>
            ))}
            {!Object.entries(cart).length && (
              <div className="order-item">
                <div className="name">Nothing's Here! ¯\_(ツ)_/¯</div>
                <button onClick={goBack}>ADD PIZZA</button>
              </div>
            )}
          </div>

          {Object.entries(cart).length && (
            <div className="navigation-container">
              <button className="nav-btn back" onClick={goBack}>
                ADD MORE
              </button>
              <button className="nav-btn next" onClick={goNext}>
                CONFIRM
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
