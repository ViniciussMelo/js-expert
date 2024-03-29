import { parseStringPromise } from 'xml2js';
import axios from 'axios';

import Character from '../../entities/character.js';

const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml';

export default class RickAndMortyUSA {
  static async getCharactersFromXML() {
    const { data } = await axios.get(URL);
    const options = {
      explicitRoot: false,  // to not get the <root></root>
      explicitArray: false, // return the content as a object not an array
    }

    // get element from results and change the name to result (add default [])
    const { results: { element: results = [] } } = await parseStringPromise(data, options);
    const defaultFormat = Array.isArray(results) ? results : [results];

    return defaultFormat.map(data => new Character(data));
  }
}