import React from 'react';
import renderer from 'react-test-renderer';

import CustomerInfoPanel from '../components/CustomerInfoPanel';

describe('CustomerInfo Panel - SnapShot test', () => {
  it('renders correctly with two inputs', () => {
    const tree = renderer
      .create(
        <CustomerInfoPanel
          request={{}}
          step={4}
          goBack={() => {}}
          placeOrder={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
