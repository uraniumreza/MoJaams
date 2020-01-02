const request = require('supertest');
const app = require('../../app');
const { ErrorHandler } = require('../services/error');
const { createOrder } = require('../services/orders');

// -------------- UNIT TESTS -------------- //
describe('Orders services', () => {
  it('should create an order', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [
        {
          itemVariantId: 4,
          quantity: 1,
        },
        {
          itemVariantId: 5,
          quantity: 1,
        },
      ],
    };

    const createdOrder = await createOrder(
      orderTestData.customerName,
      orderTestData.customerAddress,
      orderTestData.items,
    );

    expect(createdOrder.status).toBe('pending');
    expect(createdOrder.customerName).toBe(orderTestData.customerName);
    expect(createdOrder.customerAddress).toBe(orderTestData.customerAddress);
    expect(createdOrder.orderedItems.length).toBe(orderTestData.items.length);
    expect(
      createdOrder.orderedItems.every(
        ({ quantity, itemVariantId, status }, index) => {
          return (
            quantity === orderTestData.items[index].quantity &&
            itemVariantId === orderTestData.items[index].itemVariantId &&
            status === 'pending'
          );
        },
      ),
    );

    done();
  });

  it('should throw error because one of the items are not active', async (done) => {
    const orderTestData = {
      customerName: 'Afsana Jeba',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [
        {
          itemVariantId: 6,
          quantity: 1,
        },
      ],
    };

    expect(
      createOrder(
        orderTestData.customerName,
        orderTestData.customerAddress,
        orderTestData.items,
      ),
    ).rejects.toEqual(new ErrorHandler(400, 'One of your item is not active!'));

    done();
  });
});

// -------------- INTEGRATION TESTS -------------- //
describe('POST /orders', () => {
  it('should create an order', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [
        {
          itemVariantId: 4,
          quantity: 1,
        },
        {
          itemVariantId: 5,
          quantity: 1,
        },
      ],
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const { status, body } = response;

    expect(status).toBe(201);
    expect(body.status).toBe('pending');
    expect(body.customerName).toBe(orderTestData.customerName);
    expect(body.customerAddress).toBe(orderTestData.customerAddress);
    expect(body.orderedItems.length).toBe(orderTestData.items.length);
    expect(
      body.orderedItems.every(
        (orderItem, index) =>
          orderItem.quantity === orderTestData.items[index].quantity &&
          orderItem.itemVariantId ===
            orderTestData.items[index].itemVariantId &&
          orderItem.status === 'pending',
      ),
    );

    done();
  });

  it('should throw validation error because one of the items quantity is 0', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [
        {
          itemVariantId: 4,
          quantity: 1,
        },
        {
          itemVariantId: 5,
          quantity: 0,
        },
      ],
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const {
      body: { status, statusCode, message },
    } = response;

    expect(status).toBe('error');
    expect(statusCode).toBe(400);
    expect(message).toBe('"quantity" must be larger than or equal to 1');

    done();
  });

  it('should throw validation error because customerName is not given', async (done) => {
    const orderTestData = {
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [
        {
          itemVariantId: 4,
          quantity: 1,
        },
        {
          itemVariantId: 5,
          quantity: 0,
        },
      ],
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const {
      body: { status, statusCode, message },
    } = response;

    expect(status).toBe('error');
    expect(statusCode).toBe(400);
    expect(message).toBe('"customerName" is required');

    done();
  });

  it('should throw validation error because customerAddress is not given', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      items: [
        {
          itemVariantId: 4,
          quantity: 1,
        },
        {
          itemVariantId: 5,
          quantity: 0,
        },
      ],
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const {
      body: { status, statusCode, message },
    } = response;

    expect(status).toBe('error');
    expect(statusCode).toBe(400);
    expect(message).toBe('"customerAddress" is required');

    done();
  });

  it('should throw validation error because items is not given', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const {
      body: { status, statusCode, message },
    } = response;

    expect(status).toBe('error');
    expect(statusCode).toBe(400);
    expect(message).toBe('"items" is required');

    done();
  });

  it('should throw validation error because items array is empty', async (done) => {
    const orderTestData = {
      customerName: 'Nayeem Reza',
      customerAddress: '47/E, West Rajabazar, Indira Road, Dhaka',
      items: [],
    };

    const response = await request(app)
      .post('/api/v1/orders')
      .send(orderTestData);

    const {
      body: { status, statusCode, message },
    } = response;

    expect(status).toBe('error');
    expect(statusCode).toBe(400);
    expect(message).toBe('"items" must contain at least 1 items');

    done();
  });
});
