import { expect } from 'chai';
import Product from '../../../src/models/Product';
import Cart from '../../../src/models/Cart';
import Promotion from '../../../src/models/Promotion';
import { PromotionType } from '../../../src/interfaces/IPromotion';

describe('Cart - Model', () => {
  const currySauce = new Product(1, 'Curry Sauce', 1.95);
  const pizza = new Product(2, 'Pizza', 5.99);
  const menShirt = new Product(3, "Men's T-Shirt", 25);

  describe('scan', function () {
    it('returns 0 gross amount when no products are scannned', () => {
      const cart = new Cart();
      expect(cart.grossAmount).to.be.eq(0);
    });
    it('returns gross amount for all scanned products', () => {
      const cart = new Cart();
      cart.scan(currySauce);
      cart.scan(pizza);
      cart.scan(menShirt);
      expect(cart.grossAmount).to.be.eq(32.94);
    });
    it('throws error when scanned product is of incorrect type', () => {
      const cart = new Cart();
      try {
        const product = { id: 1, name: '123' };
        // explicitly supress the warning for the test-case
        // @ts-ignore
        cart.scan(product);
        expect.fail('product is missing amount key');
      } catch (error: any) {
        expect(error.message).to.be.eq('Invalid Product instance');
      }
    });
  });
});
