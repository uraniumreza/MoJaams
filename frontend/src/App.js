import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinHearts } from '@fortawesome/free-solid-svg-icons';
import useFetch from 'use-http';

import ItemSelectionPanel from './components/ItemSelectionPanel';
import CustomerInfoPanel from './components/CustomerInfoPanel';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [itemVariants, setItemVariants] = useState([]);
  const [items, setItems] = useState([]);
  const [variants, setVariants] = useState([]);

  const [cart, setCart] = useState({});
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

  const placeOrder = async (customerName, customerAddress) => {
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
      goToNextStep();
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

      return false;
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
              Create Order!
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

      <Cart
        goBack={goToPreviousStep}
        goNext={goToNextStep}
        cart={cart}
        step={step}
      />

      <CustomerInfoPanel
        request={request}
        step={step}
        goBack={goToPreviousStep}
        placeOrder={placeOrder}
      />

      <div className={`full-page ${step === 0 ? 'visible' : ''}`}>
        {step === 0 && (
          <>
            <div className="success-container">
              <FontAwesomeIcon icon={faGrinHearts} size="3x" />
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
