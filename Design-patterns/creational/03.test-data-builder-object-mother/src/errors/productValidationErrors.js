/**
 * 
 * @param {string} id 
 * @returns {string}
 */
const getInvalidProductIdMessage = (id) => {
  return `id: invalid length, current [${id}] expected to be between 2 and 20`;
}

/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const getInvalidProductNameMessage = (name) => {
  return `name: invalid value, current [${name}] expected to have only words`;
}

/**
 * 
 * @param {number} price 
 * @returns {string}
 */
const getInvalidPriceMessage = (price) => {
  return `price: invalid value, current [${price}] expected to be between 1 and 1000`;
}

/**
 * 
 * @param {string} category 
 * @returns {string}
 */
const getInvalidCategoryMessage = (category) => {
  return `category: invalid value, current [${category}] expected to be either electronic or organic`;
}

module.exports = {
  getInvalidProductIdMessage,
  getInvalidProductNameMessage,
  getInvalidPriceMessage,
  getInvalidCategoryMessage
}