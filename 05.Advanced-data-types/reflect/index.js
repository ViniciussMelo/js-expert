'use strict';

const { deepStrictEqual, throws, ok } = require('assert');

// reflect: Garantir a semantica e segurança em objetos

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
}
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// primeiro o this, depois os argumentos em um array
deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('Vish!') };

throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vish!'
  }
);


// usando reflect:
// executa de uma forma diferente
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
deepStrictEqual(result, 260);
// ---- apply

// ---- defineProperty

// questoes semanticas
function MyDate() {}

// tudo é object, mas Object adicionando prop para uma function não é aconselhável!
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey There!' });

// semanticamente faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey Dude!' });

deepStrictEqual(MyDate.withObject(), 'Hey There!');
deepStrictEqual(MyDate.withReflection(), 'Hey Dude!');
// ---- defineProperty

// ---- deleteProperty
const withDelete = { user: 'Vinicius' };
// imperformático, evitar ao máximo!
delete withDelete.user;

deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Vinicius2' }
Reflect.deleteProperty(withReflection, 'user');
// Respeitando o ciclo de vida do Javascript
deepStrictEqual(withReflection.hasOwnProperty('user'), false);
// ---- deleteProperty

// ---- get
// Deveriamos fazer um get somente em instancias de referencia
deepStrictEqual(1['userName'], undefined);
// com reflection, vai estourar uma exception
throws(() => Reflect.get(1, 'userName'), TypeError);
// ---- get

// ---- has
ok('superman' in { superman: ''} );
ok(Reflect.has({ batman: '' }, 'batman'));
// ---- has

// ---- ownKeys
const user = Symbol('user');
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'vinicius',
}

// Com os metodos de Object, temos que fazer 2 requests
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];
deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// com reflection é só um método:
deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);
// ---- ownKeys