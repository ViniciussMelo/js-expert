const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // o default são os dados corretos
    // o caso de sucesso!
    this.productData = {
      id: '00001',
      name: 'computer',
      price: 1000,
      category: 'electronic'
    }
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = '1';

    return this;
  }

  withInvalidName() {
    this.productData.name = 'abc123';

    return this;
  }

  withInvalidPrice() {
    this.productData.price = 2000;

    return this;
  }

  withInvalidCategory() {
    this.productData.category = 'mechanic';

    return this;
  }

  build() {
    return new Product(this.productData);
  }
}

module.exports = ProductDataBuilder;