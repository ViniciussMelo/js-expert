class Fibonacci {
  // generators
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }
    // retorna valores sob demanda
    yield current;
    // delega a função mas não retorna o valor
    yield* this.execute(input -1, next, current + next);
  }
}

module.exports = Fibonacci;