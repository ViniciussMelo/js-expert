const { createSandbox } = require('sinon');
const assert = require('assert');

const Fibonacci = require('./fibonacci');

// Fibonacci: o próximo valor corresponde à soma dos dois anteriores
// dado 3
// 0,1,1
// 0,1,1,2,3

const sinon = createSandbox();

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    
    // generators retornam iterators (.next)
    // existem 3 formas de ler os dados
    // usando as funções .next, for await e rest/spread
    for (const i of fibonacci.execute(3)) {};

    // nosso algorítimo vai começar do zero!
    const expectedCallCount = 4;

    // strictEqual -> tipos que não são objetos
    assert.strictEqual(spy.callCount, expectedCallCount, 'Call count does not match with expected call count!');
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // rest/spread
    const [...results] = fibonacci.execute(5);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 => PARA

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    // verificando na 2 posição (3 vez) que chama a função, quais parametros foram passados
    assert.deepStrictEqual(args, expectedParams, 'Params are not equals!');
    assert.deepStrictEqual(results, expectedResult, 'Arrays are not equals!');
  }
})();