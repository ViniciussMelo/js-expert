import ViewFactory from "../shared/base/viewFactory.mjs";

export class Application {
  /**
   * @param {ViewFactory} factory 
   */
  constructor(factory) {
    this.table = factory.createTable();
  }

  /**
   * @param {Array<any>} database 
   */
  initialize(database) {
    this.table.render(database);
  }
}