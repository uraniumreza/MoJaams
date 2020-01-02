import { build, fake } from 'test-data-bot';

const buildUser = build('User').fields({
  name: fake((f) => f.internet.userName()),
  address: fake(
    (f) =>
      `${f.address.streetName()}, ${f.address.streetSuffix()}, ${f.address.state()}, ${f.address.country()}`,
  ),
});

export { buildUser };
