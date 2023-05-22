const { deepStrictEqual, ok } = require('assert');

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);
deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));
deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
// rest/spread
deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

// set.keys == set.values -> só existe por causa do Map;

// no Array comum, para saber se um item existe:
// [].indexOf('1') !== -1 ou [0].includes(0);
ok(set.has('3'));

// mesma teoria do Map, mas você sempre trabalha com a list toda
// não tem get, então você pode saber se o item está ou não no array.
// na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em uma lista e não
// tem na outra e assim por diante:

// tem nos dois arrays:
const users01 = new Set([
  'vini',
  'erick',
  'gustavo',
]);

const users02 = new Set([
  'joaozinho',
  'vini',
  'julio'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
deepStrictEqual(Array.from(intersection), ['vini']);

const difference = new Set([...users01].filter(user => !users02.has(user)));
deepStrictEqual(Array.from(difference), ['erick', 'gustavo']);

// weakSet
// mesma ideia do WeakMap
// não é iterável
// só trabalha com chaves como referência
// só tem métodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([ user ]);
// weakSet.add(user2);
// weakSet.delete(user2);
// weakSet.has(user2);