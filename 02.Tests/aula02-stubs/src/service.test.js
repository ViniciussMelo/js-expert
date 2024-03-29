const { deepStrictEqual } = require('assert')
const { createSandbox } = require('sinon')

const Service = require('./service');

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json')
}

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const sinon = createSandbox();

(async () => {
    const service = new Service();

    // Substituir o comportamento da função pelo resultado que a gente quer
    const stub = sinon.stub(service, service.makeRequest.name);
    
    // Quando a função tiver esse argumento, ao invés de fazer a requisição, vai pegar os dados mocados 
    stub
      .withArgs(BASE_URL_1)
      .resolves(mocks.tatooine);

    stub
      .withArgs(BASE_URL_2)
      .resolves(mocks.alderaan);
  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    };

    const results = await service.getPlanets(BASE_URL_1);

    deepStrictEqual(results, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    };

    const results = await service.getPlanets(BASE_URL_2);
    
    deepStrictEqual(results, expected);
  }
})();