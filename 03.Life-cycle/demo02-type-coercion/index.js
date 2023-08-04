// true + 2 -> 3;

// true - 2 -> -1;

// '21' + true -> '21true';

// '21' - true -> 20;

// '21' -- 1 -> 22;

// 9999999999999999 -> 10000000000000000;

// 0.1+ 0.2 -> 0.30000000000000004;

// 3 > 2 -> true;
// 2 > 1 -> true;
// 3 > 2 > 1 -> false;
// 3 > 2 >= 1 -> true;

// '1' == 1 -> true; (coersão por baixo dos panos)

// '1' === 1 -> false;

// "B" + "a" ++ "a" + "a" -> BaNaNa

// site: wtfjs.com

// --------------------------

console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');

console.assert(('hello' || 123) === 'hello', '|| return the first element if it is true');
console.assert(('hello' && 123) === 123, '&& return the last element if both are true');

// --------------------------
const item = {
  name: 'Vinicius',
  age: 22,
};

console.log('--item--');
console.log('item: ', item + 0); // item: [object Object]0

const item2 = {
  name: 'Vinicius',
  age: 22,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

console.log('--item 2--');
console.log('item2: ', item2 + 0); // item2:  Name: Vinicius, Age: 220

const item3 = {
  name: 'Vinicius',
  age: 22,
  // tipo string: Chama primeiro o toString se for string, se não for primitivo chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // tipo number: Chama primeiro o valueOf se for number, se não chama o toString caso não consiga passar
  valueOf() {
    return 007;
  }
};

console.log('--item 3--');
console.log('item3: ', item3 + 0); // item3:  7
console.log('item3: ', ''.concat(item3)); // item3: Name: Vinicius, Age: 22

console.log('toString: ', String(item3)); // toString: Name: Vinicius, Age: 22
console.log('valueOf: ', Number(item3)); // valueOf: 7

const item4 = {
  name: 'Vinicius',
  age: 22,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // se não retornar um number, ele tenta chamar o to String
  valueOf() {
    return { hey: 'dude' }
    // return 007;
  }
};

console.log('--item 4--');
console.log('toString: ', String(item4)); // toString: Name: Vinicius, Age: 22
console.log('valueOf: ', Number(item4)); // valueOf: NaN (pq o o valueOf não retorna um tipo primitivo, então ele tenta chamar o toString que não retorna um number)

const item5 = {
  name: 'Vinicius',
  age: 22,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return 007;
  },
  // tem prioridade! (Ignra os outros valueOf e toString)
  [Symbol.toPrimitive](coercionType) {
    // console.log('trying to convert to', coercionType);
    const types = {
      string: JSON.stringify(this),
      number: '0007',
    }

    return types[coercionType] || types.string;
  }
};

console.log('--item 5--');
console.log('String: ', String(item5)); // String: {"name":"Vinicius","age":22}
console.log('Number: ', Number(item5)); // Number:  7
console.log('Date: ', new Date(item5)); // Chama a conversão default;

console.assert(item5 + 0 === '{"name":"Vinicius","age":22}0', 'Sum a object with zero');
console.assert(!!item, 'Converting to a boolean') // true;

// console.log('string.concat', 'Ae'.concat(item5)); // string.concat Ae{"name":"Vinicius","age":22}
console.assert('Ae'.concat(item5) === 'Ae{"name":"Vinicius","age":22}', 'Concat object');

// console.log('implicit + explicit coercion (using ==): ', item5 == String(item5)); // true
console.assert(item5 == String(item5), 'implicit + explicit coercion (using ==)');

const item6 = {...item5, name: 'Vini', age: 11};
// console.log('New Object: ', item6):
// New Object:  {
//   name: 'Vini',
//   age: 22,
//   toString: [Function: toString],
//   valueOf: [Function: valueOf],
//   [Symbol(Symbol.toPrimitive)]: [Function: [Symbol.toPrimitive]]
// }
console.assert(item6.name === 'Vini' && item6.age === 11, 'Comparing new object creation');
