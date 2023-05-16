const faker = require('faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

const Car = require('../src/entities/car');
const Customer = require('../src/entities/customer');
const CarCategory = require('../src/entities/carCategory');

const seederBaseFolder = join(__dirname, '..', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
});

const cars = [];
const customers = [];
for(let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  });

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 })
  });

  cars.push(car);
  customers.push(customer);
  carCategory.carIds.push(car.id);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

;(async () => {
  await write('cars.json', cars);
  await write('carsCategories.json', [carCategory]);
  await write('customers.json', customers);

  console.log('cars', cars);
  console.log('carsCategories', carCategory);
  console.log('customers', customers);
})();