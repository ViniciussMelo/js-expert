'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watch(event, filename) {
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
// dessa forma, ele ignora o 'this' da classe File
// e herda o this da função watch!
// watch(__filename, file.watch);

// alternativas para não herdar o this da função:
//> watch(__filename, (event, filename) => file.watch(event, filename));

// deixando explicito qual o contexto que a função deve seguir
// bind: substitui o this de dentro da função para quando ela for chamada
// retorna uma função com o 'this' que se mantém em file, ignorando o this do watch
//> watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename );
file.watch.apply({ showContent: () => console.log('call: hey sinon') }, [null, __filename] );


// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });

// quando precisar delegar uma função que será executada no futuro
// deve sempre atualizar o contexto this, usando a função bind