import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faGrinHearts } from '@fortawesome/free-solid-svg-icons';
import useFetch from 'use-http';

import ItemSelectionPanel from './components/ItemSelectionPanel';
import './App.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [itemVariants, setItemVariants] = useState([]);
  const [items, setItems] = useState([]);
  const [variants, setVariants] = useState([]);

  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [placedOrder, setPlacedOrder] = useState();

  const [request, response] = useFetch('http://localhost:8000/api');

  // componentDidMount
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // setStep(step + 1);
    getAllItemVariants();
  });

  const getAllItemVariants = async () => {
    const itemVariants = await request.get('/v1/item-variants');
    if (response.ok) {
      setItemVariants(itemVariants);
      setItems([...new Set(itemVariants.map((item) => item.itemName))]);
      setVariants([...new Set(itemVariants.map((item) => item.variantName))]);
    }
  };

  const placeOrder = async () => {
    const placedOrder = await request.post('/v1/orders', {
      customerName,
      customerAddress,
      items: Object.entries(cart).map(([itemVariantId, orderItem]) => ({
        itemVariantId,
        quantity: orderItem.quantity,
      })),
    });

    if (response.ok) {
      setPlacedOrder(placedOrder);
      setStep(step + 1);
    }
  };

  const setVariantsForSpecificItem = (item) => {
    setVariants([
      ...new Set(
        itemVariants
          .filter((itemVariant) => itemVariant.itemName === item)
          .map((itemVariant) => itemVariant.variantName),
      ),
    ]);
  };

  const goToPreviousStep = () => setStep(step - 1);
  const goToNextStep = () => setStep(step + 1);

  const addToCart = (newItem) => {
    itemVariants.some((itemVariant) => {
      if (
        itemVariant.itemName === newItem.itemName &&
        itemVariant.variantName === newItem.itemVariant
      ) {
        setCart({
          ...cart,
          [itemVariant.id]: newItem,
        });

        return true;
      }
    });

    setStep(step + 1);
  };

  return (
    <div className="App">
      <div className={`full-page bg-teal ${step === 1 ? 'visible' : ''}`}>
        {step === 1 && (
          <>
            Welcome to MoJaams
            <button className="start-btn" onClick={() => setStep(step + 1)}>
              Create an Order!
            </button>
          </>
        )}
      </div>

      <ItemSelectionPanel
        step={step}
        items={items}
        request={request}
        variants={variants}
        addToCart={addToCart}
        goBack={goToPreviousStep}
        setVariantsForSpecificItem={setVariantsForSpecificItem}
      />

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
              <button
                className="nav-btn back"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                ADD MORE
              </button>
              <button
                className="nav-btn next"
                onClick={() => setStep(step + 1)}
              >
                CONFIRM
              </button>
            </div>
          </>
        )}
      </div>

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
              placeholder="and address to deliver?"
              className="customer-info"
              autoComplete="true"
            />

            <div className="navigation-container">
              <button
                className="nav-btn back"
                onClick={() => setStep(step - 1)}
              >
                BACK
              </button>
              <button className="nav-btn next" onClick={placeOrder}>
                PLACE ORDER{' '}
                {request.loading && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </>
        )}
      </div>

      <div className={`full-page ${step === 0 ? 'visible' : ''}`}>
        {step === 0 && (
          <>
            <div className="success-container">
              <FontAwesomeIcon icon={faGrinHearts} size="3x" rotation={300} />
              <h3 className="success-text">
                Congratulations! Your order #{placedOrder && placedOrder.id} has
                been placed successfully!
              </h3>
            </div>
            <button className="start-btn" onClick={() => setStep(1)}>
              Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
