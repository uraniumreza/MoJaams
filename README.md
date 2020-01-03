# MoJaams 🍕🍕🍕

> Deployed the solution in an ec2 instance; you can check out from here - [MoJaams](http://18.189.116.96)

## 📒Description 

Pizza ordering services with the following functionality:

1. Order a pizza:
   - Specify the desired pizza type (margarita, marinara, salami), the number of pizza items and their size (small, medium, large).
     Example: 1 x Salami small, 2 x Marinara large, 1 x Salami medium
   - An order should contain information about the customer: name, address
   - It should be possible to track the status of order delivery. (new, preparing, delivering, delivered)
2. Update an order:
   - There should be a possibility to update the order details (pizzas/number of pizzas/size)
   - There should be a possibility to change the status of order delivery
   - An order in some delivery statuses (e.g. delivered) could not be updated
3. Remove an order
4. Retrieve an order
5. List orders
   - Provide filtering by status/customer

## 💾 Database Modelling 

I've created 5 tables for the solution of the task. Used `sequelize` with `PostgreSQL` for migration, seed, and querying from the tables.

1. `Items` for storing pizza-items related information i.e. `name` and `status`. The default status of each item is `active`. We can `inactive` a particular item so that end-users won't see a particular item.
2. `Variants` for storing different variations e.g. large, medium, etc. Here, we have only the `name` field.
3. `ItemVariants` is the table to normalize the many-many relationship between `Items` and `Variants`; here we'll have `itemId`, `variantId` and `status` to identify each item variation. Now, this table has one-to-many relationship with the other two tables. For simplicity, I'm assuming that each item will have at least one variant!
4. `Orders` to keep customer information i.e. `name` and `address` and the `status` of the order. The initial status of each order is `pending`.
5. `OrderItems` is to store all the order-items and their `quantity`. Each order-item has a `status` so that an order-item
   can be `canceled` separately.

## ⚙️ Backend

- **express.js**: To develop the RESTful API service
- **joi**: To create my own `validator` middleware for `request` object validation
   - Created a global `error-handler` along with extending the `Error` object to create a `customError`
- **jest** and **supertest**: For unit-testing the `services` and integration testing the routes/end-points

### Folder Structure

| filename           | description                                          |
| ------------------ | ---------------------------------------------------- |
| bin/www            | contains the server                                  |
| config/config.json | sequelize config file                                |
| src/\_\_tests\_\_  | contains all the unit-tests and integration-tests    |
| src/controllers    | defines all the end-points                           |
| src/middlewares    | contains all the middlewares                         |
| src/migrations     | all the migration files generated by sequelize       |
| src/models         | contains data-models of each table                   |
| src/seeders        | seed-data to initialize the database with dummy data |
| src/services       | contains all the business-logics for controllers     |

### APIs

I've used `postman` during my API-services development time; here's the collection that might help you to test the _API_s easily: [MoJaams Postman API Collection](https://www.getpostman.com/collections/01660fdeebd64ebabf18)

1. Get item list filtered with `status` (_optional_, if not sent fetch all items regardless of the `status`)

```
GET :: /api/v1/items?status=active
```

2. Create a single item; just need to send the `name`

```
POST :: /api/v1/items
```

3. Create a variant with a name; same as the item creation

```
POST :: /api/v1/variants
```

4. Retrieve information of a single variant

```
GET :: /api/v1/variants/:variantId
```

5. Get all the item-variants filtered with `status`

```
GET :: /api/v1/item-variants
```

6. Create a order with `customerName`, `customerAddress` and `items`

```
POST :: /api/v1/orders
```

7. Get order-list filtered-by `status` and `customerName`; support of pagination

```
GET :: /api/v1/orders
```

7. Retrieve a particular order detail

```
GET :: /api/v1/orders/:orderId
```

8. Update particular order information; also update order-items information

```
PATCH :: /api/v1/orders/:orderId
```

To remove an order we can use the `patch` API to update the status to _canceled_

### Tests

I wrote extensive unit-tests and integration-tests for the create-order APIs and services. I also wrote a few unit-tests for items and item-variants services. Here's the code-coverage report -

![Code coverage report of Backend service](https://i.imgur.com/7hp5HaF.png)

## 💅🏼Frontend

- **create-react-app**: To bootstrap the project
- **prop-types**: For static type checking for all the components
- **use-http**: For data-fetching purpose

> As the main task is to build a simplified UI to place an order; I didn't use `react-router`, I believe it could be an overkill for this task. Also, I didn't use any state management tools e.g. `redux`/`mobx`. The amount of data/state we had to manage for this task is too little to jump into configuring `redux`.

### Folder Structure

Everything under `src` directory -

| filename          | description                         |
| ----------------- | ----------------------------------- |
| cypress/e2e       | contains e2e test specs             |
| src/\_\_tests\_\_ | contains all the snapshot-tests     |
| src/components    | contains all components             |
| src/App.js        | root component; container-component |
| src/App.css       | all the styles                      |

### Tests
Used `jest` and `react-test-render` to write snapshot tests for all the components. Wrote a cypress spec for `app.js` to test the whole end-to-end test of the order creation process. Here's the snap video: 

[![e2e-test](https://i.imgur.com/hRyEtGj.png)](https://i.imgur.com/KCG4N9I.mp4)


## 🏃🏼Running Project (Locally)

First, we need to clone the repo -

```
git clone git@github.com:uraniumreza/MoJaams.git
```

Then, we'll build our docker containers -

```
docker-compose up --build
```

Wait for our docker containers to be up! And then we'll run the database creation (both `dev` and `test`), migration and seed scripts -

```
docker exec --user postgres mojaams_db /bin/sh -c 'createdb mojaams_test; createdb mojaams_dev;'
docker exec mojaams_backend /bin/sh -c "npx sequelize-cli db:migrate; npx sequelize-cli db:seed:all;"
```

So, our services are up; we can test - [MoJaams](http://localhost)

### Running Tests

#### Backend

```
docker exec mojaams_backend /bin/sh -c "npm test"
```

#### Frontend

```
SnapShot tests: docker exec mojaams_frontend /bin/sh -c "cd app; npm test;"
E2E test: docker exec mojaams_frontend /bin/sh -c "cd app; npm run test:e2e;"
```
