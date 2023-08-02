import { database } from "../shared/data.mjs";
import { Application } from "./application.mjs";

; (async function main() {
  // verificar qual plataforma ele escolheu
  const path = globalThis.window ? 'browser' : 'console';
  // exportando com o default não dá nome para a classe
  const { default: DefaultViewFactory } = await import(`./../platforms/${path}/index.mjs`);

  const app = new Application(new DefaultViewFactory());
  app.initialize(database);
})();