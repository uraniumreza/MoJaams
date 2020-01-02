import React from 'react';
import renderer from 'react-test-renderer';

import ItemSelectionPanel from '../components/ItemSelectionPanel';

describe('ItemSelectionPanel - SnapShot test', () => {
  it('renders correctly when there are no items and variants', () => {
    const tree = renderer
      .create(
        <ItemSelectionPanel
          step={2}
          items={[]}
          variants={[]}
          request={{}}
          addToCart={() => {}}
          goBack={() => {}}
          setVariantsForSpecificItem={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there are 1 item and 2 variants', () => {
    const tree = renderer
      .create(
        <ItemSelectionPanel
          step={2}
          items={['Marinara']}
          variants={['Large', 'Medium']}
          request={{}}
          addToCart={() => {}}
          goBack={() => {}}
          setVariantsForSpecificItem={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there is a selected item for update', () => {
    const tree = renderer
      .create(
        <ItemSelectionPanel
          step={2}
          items={['Marinara']}
          variants={['Large', 'Medium']}
          request={{}}
          addToCart={() => {}}
          goBack={() => {}}
          setVariantsForSpecificItem={() => {}}
          selectedCartItem={{
            itemName: 'Marinara',
            itemVariant: 'Medium',
            quantity: 2,
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
