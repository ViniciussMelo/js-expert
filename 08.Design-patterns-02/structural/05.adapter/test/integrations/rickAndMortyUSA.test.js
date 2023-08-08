import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';

import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA.js';
import Character from '../../src/entities/character.js';
import axios from 'axios';

describe('#RickAndMortyUSA', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('#getCharactersXML should return a list of Character Entity', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml');
    const expected = [{ "gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)" }];

    // mock axios.get
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    // StrictEqual: validate the instance too
    // toMatchObject: validate only the keys and values
    expect(result).toMatchObject(expected);
  });

  test('#getCharactersXML should return an empty list if the API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml');
    const expected = [];

    // mock axios.get
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toStrictEqual(expected);
  });
});