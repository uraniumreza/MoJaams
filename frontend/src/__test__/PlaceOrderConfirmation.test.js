import React from 'react';
import renderer from 'react-test-renderer';

import PlaceOrderConfirmation from '../components/PlaceOrderConfirmation';

describe('Cart - SnapShot test', () => {
  it('renders correctly when order-place failed', () => {
    const tree = renderer
      .create(
        <PlaceOrderConfirmation
          step={5}
          goHome={() => {}}
          goToCart={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when order-place succeed', () => {
    const tree = renderer
      .create(
        <PlaceOrderConfirmation
          step={5}
          goHome={() => {}}
          goToCart={() => {}}
          placedOrder={{ id: 1 }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
