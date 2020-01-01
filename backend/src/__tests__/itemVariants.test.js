const { getAllActiveItemVariants } = require('../services/itemVariants');

it('should return all the active item-variants', async (done) => {
  const allActiveItemVariants = await getAllActiveItemVariants();
  expect(
    allActiveItemVariants.every(
      (itemVariant) => itemVariant.status === 'active',
    ),
  ).toBe(true);
  done();
});
