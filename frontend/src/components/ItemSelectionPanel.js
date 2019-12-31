import React, { useState } from 'react';
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
}) => {
  const [selectedPizza, setSelectedPizza] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const initializeStates = () => {
    setSelectedPizza(undefined);
    setSelectedSize(undefined);
    setSelectedQuantity(1);
  };

  const addNewItemToCart = () => {
    const newItem = {
      itemName: selectedPizza,
      itemVariant: selectedSize,
      quantity: selectedQuantity,
    };

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
                    onClick={() => setSelectedSize(variant)}
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

export default ItemSelectionPanel;
