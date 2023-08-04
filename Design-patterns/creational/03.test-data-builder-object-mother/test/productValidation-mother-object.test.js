const { it, describe } = require('mocha');
const { expect } = require('chai');

const {
  getInvalidProductIdMessage,
  getInvalidProductNameMessage,
  getInvalidPriceMessage,
  getInvalidCategoryMessage
} = require('../src/errors/productValidationErrors');
const ProductMotherObject = require('./model/productMotherObject');
const { productValidator } = require('./../src');

describe('Test Mother Object', () => {
  it('should not return error with valid product', () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true,
    }

    expect(result).to.be.deep.equal(expected);
  });

  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductMotherObject.withInvalidId();
      const result = productValidator(product)

      const expected = {
        errors: [getInvalidProductIdMessage(product.id)],
        result: false,
      }

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product)

      const expected = {
        errors: [getInvalidProductNameMessage(product.name)],
        result: false,
      }

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = productValidator(product)

      const expected = {
        errors: [getInvalidPriceMessage(product.price)],
        result: false,
      }

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductMotherObject.withInvalidCategory();
      const result = productValidator(product)

      const expected = {
        errors: [getInvalidCategoryMessage(product.category)],
        result: false,
      }

      expect(result).to.be.deep.equal(expected);
    });
  });
})