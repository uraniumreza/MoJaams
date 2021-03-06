import React, { useState, useRef, useEffect } from 'react';
import useFetch from 'use-http';

import ItemSelectionPanel from './components/ItemSelectionPanel';
import CustomerInfoPanel from './components/CustomerInfoPanel';
import PlaceOrderConfirmation from './components/PlaceOrderConfirmation';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [itemVariants, setItemVariants] = useState([]);
  const [items, setItems] = useState([]);
  const [variants, setVariants] = useState([]);

  const [cart, setCart] = useState({});
  const [selectedCartItem, setSelectedCartItem] = useState();
  const [placedOrder, setPlacedOrder] = useState();

  const [request, response] = useFetch('http://localhost/api');

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    goHome();
    getAllItemVariants();
  });

  const goToPreviousStep = () => setStep(step - 1);
  const goToNextStep = () => setStep(step + 1);
  const goToCart = () => setStep(3);
  const goHome = () => setStep(1);

  const getAllItemVariants = async () => {
    const itemVariants = await request.get('/v1/item-variants?status=active');
    if (response.ok) {
      setItemVariants(itemVariants);
      setItems([...new Set(itemVariants.map((item) => item.itemName))]);
      setVariants([...new Set(itemVariants.map((item) => item.variantName))]);
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

  const removeFromCart = (id) => {
    let { [id]: omit, ...res } = cart;
    setCart(res);
  };

  const editOrderItem = (id) => {
    const orderItem = cart[id];
    removeFromCart(id);
    setSelectedCartItem(orderItem);
    setStep(2);
  };

  const clearCart = () => {
    setCart({});
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

    if (response.ok) clearCart();
    setPlacedOrder(placedOrder);
    goToNextStep();
  };

  return (
    <div className="App">
      <div className={`full-page bg-teal ${step === 1 ? 'visible' : ''}`}>
        {step === 1 && (
          <>
            Welcome to MoJaams
            <button className="start-btn" onClick={() => setStep(step + 1)}>
              Create Order
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
        selectedCartItem={selectedCartItem}
      />

      <Cart
        goBack={goToPreviousStep}
        goNext={goToNextStep}
        cart={cart}
        step={step}
        editOrderItem={editOrderItem}
        removeFromCart={removeFromCart}
      />

      <CustomerInfoPanel
        request={request}
        step={step}
        goBack={goToPreviousStep}
        placeOrder={placeOrder}
      />

      <PlaceOrderConfirmation
        step={step}
        goHome={goHome}
        goToCart={goToCart}
        placedOrder={placedOrder}
      />
    </div>
  );
};

export default App;
