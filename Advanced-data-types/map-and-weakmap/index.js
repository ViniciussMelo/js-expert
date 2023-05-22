const { deepStrictEqual, ok, throws } = require('assert');

const myMap = new Map();

myMap
  .set(1, 'one')
  .set('Vinicius', { text: 'two' })
  .set(true, () => 'hello');

// usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
]);

console.log('myMap', myMap);
// myMap Map(3) {
//   1 => 'one',
//   'Vinicius' => { text: 'two' },
//   true => [Function (anonymous)]
// }

deepStrictEqual(myMap.get(1), 'one');
deepStrictEqual(myMap.get('Vinicius'), { text: 'two' });
deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser strin ou symbol (number é coergido a string)
const onlyReferencesWorks = { id: 1 };
myMap.set(onlyReferencesWorks, { name: 'Vinicius' });

deepStrictEqual(myMap.get({ id: 1}), undefined);
deepStrictEqual(myMap.get(onlyReferencesWorks), { name: 'Vinicius' });

// utils
// - No Objects seria Object.keys({a: 1}).length
deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto:
// 1 - item.key = se não existe = undefined
// 2 - if () = coerção implicita para boolean e retorna false
// O jeito certo em Object: é ({ name: 'Vinicius' }).hasOwnProperty('name');
ok(myMap.has(onlyReferencesWorks));

// para remover um item do objeto
// delete item.id
// mas não é performático para o Javascript
ok(myMap.delete(onlyReferencesWorks), true);
// return true or false

// Não dá para iterar em Objects diretamente
// Apenas transformando com o Object.entries()
deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Vinicius",{"text":"two"}],[true, () => {}]]));

for (const [key, value] of myMap) {
  console.log({ key, value });
}
// { key: 1, value: 'one' }
// { key: 'Vinicius', value: { text: 'two' } }
// { key: true, value: [Function (anonymous)] }

// Object é inseguro pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({  }).toString() => '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'
// qualquer chave/propriedade pode colidir com as propriedades herdadas no objecto
// como: constructor, toString, valueOf e etc...
const actor = {
  name: 'Vini',
  toString: 'Vini: to String()'
};

myMap.set(actor);

deepStrictEqual(myMap.has(actor), true);
// não existe a propriedade
throws(() => myMap.get(actor).toString, TypeError);

// Não tem como limpar um Objeto sem reassina-lo;
myMap.clear();
deepStrictEqual([...myMap.keys()], [])

// --- WeakMap
// Pode ser coletado após perder as referências
// usados em casos muito específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referência e que você já conheça
// mais leve e prevê leak de memória, pq depois que as instancias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);