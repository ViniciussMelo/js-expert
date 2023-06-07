const { evaluateRegex } = require('./../src/util');

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^ => começo da string
    // + => uma ou mais ocorrencias
    // ^(\w{1}) => separar em um grupo a primeira letra
    // ([a-zA-Z]+$) => pegar todo o resto da frase que possue letra em outro grupo
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    
    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      });
    };

    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);

    // /\D/ => tudo que não for digito
    // tudo que não for digito (numero) vira vazio
    // /g serve para remover todas as occorências encontradas
    this.documento = documento.replace(evaluateRegex(/\D/g), "");

    // /(?<=\sa\s).*$/
    // ?<= => Positive lookbehind para ignorar o que está atrás do match ( a )
    // \sa\s => procurando por ' a ' (espaço+a+espaço)
    // .*$ => pegando tudo que está na frente disso até o fim da linha
    // match => retorna sempre um array do que foi encontrado
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();

    // /(?<=\s).*$/
    // /(?<=\s) => Positive lookbehind para ignorar o que está atrás do match ( espaço )
    // \s => procura por um espaço
    // .*$/ => pegar tudo até o fim da linha
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();

    // remove o ponto literal no fim da frase
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
    
    this.numero = numero;
    this.nome = nome;
  }
}

module.exports = Person;