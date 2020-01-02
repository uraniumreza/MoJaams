import React from 'react';
import PropTypes from 'prop-types';

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
              <div className="order-item empty">
                <div className="name empty">Nothing's Here! ¯\_(ツ)_/¯</div>
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

Cart.propTypes = {
  step: PropTypes.number.isRequired,
  cart: PropTypes.objectOf(
    PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      itemVariant: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ),
  editOrderItem: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
};

export default Cart;
