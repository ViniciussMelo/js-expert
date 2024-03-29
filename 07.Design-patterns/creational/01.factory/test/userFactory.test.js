const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

const { MockDatabase, dbData } = require('./mocks/databaseMock');

rewiremock(() => require('./../src/util/database')).with(MockDatabase);

; (async () => {
  {
    // with rewiremock.
    const expected = dbData.map(item => ({ ...item, name: item.name.toUpperCase() }));
    rewiremock.enable();
    // should require after enable rewiremock.
    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();

    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    // without rewiremock
    const expected = [{ name: 'VINICIUSMELO' }];
    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();

    deepStrictEqual(result, expected);
  }
})()