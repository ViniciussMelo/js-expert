import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSAAdapter
].map(integration => integration.getCharacters());

const all = await Promise.allSettled(data);

const successes = all.filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  // concat
  .reduce((prev, next) => prev.concat(next), []);

const errors = all.filter(({ status }) => status === 'rejected')
  .map(({ value }) => value)
  // concat
  .reduce((prev, next) => prev.concat(next), []);

console.table(successes);
console.table(errors);