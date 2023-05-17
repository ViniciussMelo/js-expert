const { deepStrictEqual } = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explicitas:
console.log('new Object() is {} ? ', new Object().__proto__ === {}.__proto__); // true
deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referência do objeto que possui as propriedades dele
console.log('obj.__proto__ === Object.prototype: ', obj.__proto__ === Object.prototype); // true
deepStrictEqual(obj.__proto__, Object.prototype);

console.log('arr.__proto__ === Array.prototype): ', arr.__proto__ === Array.prototype); // true
deepStrictEqual(arr.__proto__, Array.prototype);

console.log('fn.__proto__ === Function.prototype): ', fn.__proto__ === Function.prototype); // true
deepStrictEqual(fn.__proto__, Function.prototype);

// o __proto__ de Object.property é null
console.log('obj.__proto__.__proto__: ', obj.__proto__.__proto__); // null
deepStrictEqual(obj.__proto__.__proto__, null);

// ---------------

function Employee() {}
Employee.prototype.salary = () => 'salary**';

console.log(Employee.prototype.salary()); // salary**

function Supervisor() {}
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**"; // Participação nos lucros

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

// conseguimos chamar via prototype, porém se tentar chamar direto, dará erro!
console.log('Manager.prototype.salary(): ', Manager.prototype.salary()); // salary**
// console.log('Manager.prototype.salary(): ', Manager.salary()); // error!!

// se não chamar o 'new', o primeiro __proto__ vai ser sempre 
// a instancia de Function, sem herdar nossas classes.
// Para acessar as classes sem o new, podemos acessar direto via prototype
console.log('Manager.prototype.__proto__ === Supervisor.prototype: ', Manager.prototype.__proto__ === Supervisor.prototype);
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log('new Manager().__proto__: %s, new Manager().salary(): %s', new Manager().__proto__, new Manager().salary()); // Employee { monthlyBonuses: [Function (anonymous)] } salary**
console.log('Supervisor.prototype === new Manager().__proto__.__proto__: ', Supervisor.prototype === new Manager().__proto__.__proto__); // true
deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

console.log('=======');
const manager = new Manager();
console.log('manager.salary(): ', manager.salary()); // salary**
console.log('manager.profitShare(): ', manager.profitShare()); // profitShare**
console.log('manager.monthlyBonuses(): ', manager.monthlyBonuses()); // monthlyBonuses**

console.log(manager.__proto__) // Manager -> Employee { monthlyBonuses: [Function (anonymous)] }
console.log(manager.__proto__.__proto__) // Supervisor -> Employee { profitShare: [Function (anonymous)] }
console.log(manager.__proto__.__proto__.__proto__) // Employee -> { salary: [Function (anonymous)] }
console.log(manager.__proto__.__proto__.__proto__.__proto__) // Prototype de Object = null -> [Object: null prototype] {}

deepStrictEqual(manager.__proto__, Manager.prototype);
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

console.log('=======');
class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3();
console.log('t3 inherits null?: ', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null); // true
console.log('t3.ping(): ', t3.ping());
console.log('t3.pong(): ', t3.pong());
console.log('t3.shoot(): ', t3.shoot());

deepStrictEqual(t3.__proto__, T3.prototype);
deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);