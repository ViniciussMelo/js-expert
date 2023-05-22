const { deepStrictEqual, throws } = require('assert');

// --- keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

console.log('getting normal Objects: ', user.userName);
deepStrictEqual(user.userName, 'value for normal Objects');

// sempre único em nível de endereço de memória
console.log('getting normal Objects: ', user[Symbol('userName')]);
deepStrictEqual(user[Symbol('userName')], undefined);

console.log('getting normal Objects: ', user[uniqueKey]);
deepStrictEqual(user[uniqueKey], 'value for symbol');

// é mais difícil de acessar o dado, porém ainda não é secreto
console.log('symbols: ', Object.getOwnPropertySymbols(user));
deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (nem tem no codebase/repositório do node)
user[Symbol.for('password')] = 123;
deepStrictEqual(user[Symbol.for('password')], 123);
// --- keys

// Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      }
    }
  }),
}

// for (const iterator of obj) {
//   console.log(iterator)
// }

deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
);

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02),
];

// [object 
// Object] -> To String Tag
deepStrictEqual(Object.prototype.toString.call(myDate), '[object Object]');

class MyDate2 {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    const items = this[kItems]
                    .map(item => 
                            new Intl
                                .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
                                .format(item)
                        );
    
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate2 = new MyDate2(
  [2020, 03, 01],
  [2018, 02, 02]
);

deepStrictEqual(Object.prototype.toString.call(myDate2), '[object WHAT?]');
throws(() => myDate2 + 1, TypeError);
// coerção explicita para chamar o toPrimitive
deepStrictEqual(String(myDate2), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator!
deepStrictEqual([...myDate2], expectedDates);
// async iterator
;(async() => {
  for await (const item of myDate2) {
    console.log('asyncIterator: ', item);
  }
})();