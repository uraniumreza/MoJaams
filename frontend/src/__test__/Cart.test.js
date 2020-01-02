import React from 'react';
import renderer from 'react-test-renderer';

import Cart from '../components/Cart';

describe('Cart - SnapShot test', () => {
  it('renders correctly when there are no items', () => {
    const tree = renderer
      .create(
        <Cart
          step={3}
          cart={{}}
          editOrderItem={() => {}}
          removeFromCart={() => {}}
          goBack={() => {}}
          goNext={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there are 2 items', () => {
    const tree = renderer
      .create(
        <Cart
          step={3}
          cart={{
            '3': {
              itemName: 'Margarita',
              itemVariant: 'Small',
              quantity: 1,
            },
            '5': {
              itemName: 'Four Seasons',
              itemVariant: 'Medium',
              quantity: 2,
            },
          }}
          editOrderItem={() => {}}
          removeFromCart={() => {}}
          goBack={() => {}}
          goNext={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
