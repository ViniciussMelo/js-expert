import NotImplementedException from "../notImplementedExceptions.mjs";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
}