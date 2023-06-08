const dbData = [{ name: 'Mariazinha' }, { name: 'Joaozin' }];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

module.exports = { MockDatabase, dbData };