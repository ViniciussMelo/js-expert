/* 
ProductID: should be between 2 and 20 characters;
Name: should be only words;
Price: should be from zero to a thousand;
Category: should be electronic or organic
*/

const { getInvalidProductIdMessage, getInvalidProductNameMessage, getInvalidPriceMessage, getInvalidCategoryMessage } = require("./errors/productValidationErrors");

function productValidator(product) {
  const errors = [];

  if (!(product.id.length >= 2 && product.id <= 20)) {
    errors.push(getInvalidProductIdMessage(product.id));
  }

  // tudo que não for letra ou tiver algum digito
  if (/(\W|\d)/.test(product.name)) {
    errors.push(getInvalidProductNameMessage(product.name));
  }

  if (!(product.price >= 1 && product.price <= 1000)) {
    errors.push(getInvalidPriceMessage(product.price));
  }

  if (!(['electronic', 'organic'].includes(product.category))) {
    errors.push(getInvalidCategoryMessage(product.category));
  }

  return {
    result: errors.length === 0,
    errors,
  }
}

module.exports = {
  productValidator
}