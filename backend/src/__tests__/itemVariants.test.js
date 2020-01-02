const request = require('supertest');
const app = require('../../app');
const { getItemVariants } = require('../services/itemVariants');

// -------------- UNIT TESTS -------------- //
describe('ItemVariant services', () => {
  it('should get all the item-variants', async (done) => {
    const allItemVariants = await getItemVariants();
    expect(allItemVariants.length).toBe(6);

    done();
  });

  it('should get all the active item-variants', async (done) => {
    const allItemVariants = await getItemVariants('active');
    expect(allItemVariants.every(({ status }) => status === 'active')).toBe(
      true,
    );
    expect(allItemVariants.length).toBe(5);

    done();
  });

  it('should get all the inactive item-variants', async (done) => {
    const allItemVariants = await getItemVariants('inactive');
    expect(allItemVariants.every(({ status }) => status === 'inactive')).toBe(
      true,
    );
    expect(allItemVariants.length).toBe(1);

    done();
  });
});

// -------------- INTEGRATION TESTS -------------- //
describe('GET /item-variants', () => {
  it('should return active item-variants', async (done) => {
    const response = await request(app).get(
      '/api/v1/item-variants?status=active',
    );

    const { status, body } = response;

    expect(status).toBe(200);
    expect(body.length).toBe(5);
    expect(
      body.every(
        ({ status: itemVariantStatus }) => itemVariantStatus === 'active',
      ),
    ).toBe(true);
    done();
  });
});
