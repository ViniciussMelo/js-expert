//  o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrão Builder
// a diferençã é que aqui é sobre processos, já o Builder
// sobre construção de objetos
class TextProcessorFluentAPI {
  #content;
  
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= -> fala que vai extrair os dados que virão após esse grupo
    // [contratante|contratada] -> irá selecionar ou um ou outro (e tem a flag /i no final da expressão para pegar maiusculo e minusculo)
    // :\s{1} -> vai procurar quem tiver o caracter literal : seguido de um espaço
    // tudo acima fica dentro de um parenteses para dizer que iremos pegar tudo daí pra frente

    // (?!\s) -> negative look around, para ignorar os contratantes no final do documento que tem 2 espaços
    // .*\n -> pegar qualquer coisa até a primeira quebra de linha \n
    // .*? -> non greedy, esse ? faz com que ele pare na primeira recorrencia, assim evita ficar em loop
    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i-> insensitive

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    // faz o match para encontrar a string inteira que contém os dados que precisamos
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;
    
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;