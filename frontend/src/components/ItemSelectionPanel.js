import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const ItemSelectionPanel = ({
  step,
  items,
  request,
  variants,
  goBack,
  addToCart,
  setVariantsForSpecificItem,
  selectedCartItem,
}) => {
  const [selectedPizza, setSelectedPizza] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    if (selectedCartItem) initializeStates(true);
  }, [selectedCartItem]);

  const initializeStates = (prePopulate) => {
    setSelectedPizza(prePopulate ? selectedCartItem?.itemName : undefined);
    setSelectedSize(prePopulate ? selectedCartItem?.itemVariant : undefined);
    setSelectedQuantity(prePopulate ? selectedCartItem?.quantity : 1);
  };

  const addNewItemToCart = () => {
    const newItem = {
      itemName: selectedPizza,
      itemVariant: selectedSize,
      quantity: selectedQuantity,
    };

    initializeStates(false);
    addToCart(newItem);
  };

  return (
    <div className={`full-page ${step === 2 ? 'visible' : ''}`}>
      {step === 2 && (
        <>
          {request.error && 'Error!'}
          {request.loading && 'Loading...'}
          {items.length && (
            <>
              <h4 className="title">Grab your Pizza!</h4>
              <div className="pizza-container">
                {items.map((item, index) => (
                  <div
                    className={`pizza-item ${
                      selectedPizza === item ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSelectedPizza(item);
                      setSelectedSize();
                      setSelectedQuantity(1);
                      setVariantsForSpecificItem(item);
                    }}
                    key={index.toString()}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {variants.length && (
            <div className={`section ${selectedPizza ? 'visible' : ''}`}>
              <h4 className="title">What size you prefer?</h4>
              <div className="pizza-container">
                {variants.map((variant, index) => (
                  <div
                    className={`pizza-item ${
                      selectedSize === variant ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSelectedSize(variant);
                      setSelectedQuantity(1);
                    }}
                    key={index.toString()}
                  >
                    <span>{variant}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`section ${selectedSize ? 'visible' : ''}`}>
            <h4 className="title">How many of them?</h4>
            <div className="counter-container">
              <button
                className="counter-btn"
                title="I want less!"
                onClick={() => {
                  selectedQuantity > 1 &&
                    setSelectedQuantity(selectedQuantity - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
              </button>
              <span className="counter">{selectedQuantity}</span>
              <button
                className="counter-btn"
                title="I want more!"
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </div>
          </div>

          <div className="navigation-container">
            <button
              className="nav-btn back"
              onClick={() => {
                goBack();
                initializeStates();
              }}
            >
              BACK
            </button>

            {selectedPizza && selectedSize && (
              <button className="nav-btn next" onClick={addNewItemToCart}>
                NEXT
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ItemSelectionPanel.propTypes = {
  step: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired),
  variants: PropTypes.arrayOf(PropTypes.string.isRequired),
  request: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  setVariantsForSpecificItem: PropTypes.func.isRequired,
  selectedCartItem: PropTypes.shape({
    itemName: PropTypes.string.isRequired,
    itemVariant: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
};

export default ItemSelectionPanel;
