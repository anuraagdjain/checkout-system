import { expect } from 'chai';
import Product from '../../../src/models/Product';

describe('Product Model', function () {
  it('Successfully creates a Product instance', function () {
    const product = new Product('test', 100);
    expect(product.amount).to.be.eq(100);
    expect(product.name).to.be.eq('test');
  });
  it('Fails to create Product instance because of negative amount', function () {
    try {
      new Product('test', -1);
      expect.fail('cannot give negative amount');
    } catch (error: any) {
      expect(error.message).to.be.eq('Amount cannot be less than 0.');
    }
  });
});
