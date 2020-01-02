const { getItems } = require('../services/items');

// -------------- UNIT TESTS -------------- //
describe('Items services', () => {
  it('should get all the items', async (done) => {
    const allItems = await getItems();
    expect(allItems.length).toBe(3);

    done();
  });

  it('should get all the active items', async (done) => {
    const allItems = await getItems('active');
    expect(allItems.length).toBe(2);

    done();
  });

  it('should get all the inactive items', async (done) => {
    const allItems = await getItems('inactive');
    expect(allItems.length).toBe(1);

    done();
  });
});
