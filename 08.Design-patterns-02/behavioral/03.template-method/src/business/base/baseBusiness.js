import { NotImplementedException } from "../../util/exceptions.js";

// could be an interface
export default class BaseBusiness {
  // _ => because are protected functions that will be implemented
  // only in the child classes
  _validateRequiredFields(data) {
    throw new NotImplementedException(
      this._validateRequiredFields.name
    )
  }

  _create(data) {
    throw new NotImplementedException(
      this._create.name
    )
  }

  /*
    Martin Fowler Pattern:
    the propose of this pattern is to ensure the methods flow, by defining a sequence
    to be executed.

    this create is the real implementation of Template Method.
  */
  create(data) {
    const isValid = this._validateRequiredFields(data);
    if (!isValid) throw new Error('invalid data!');

    return this._create(data);
  }
}