import { expect } from 'chai';
import { PromotionType } from '../../../src/interfaces/IPromotion';
import Promotion from '../../../src/models/Promotion';

describe('Promotion Model', function () {
  it('Creates a NONE Promotion by default', function () {
    const promotion = new Promotion();
    expect(promotion.promotionType).to.be.eq(PromotionType.NONE);
    expect(promotion.quantity).to.be.eq(undefined);
    expect(promotion.percentageDiscount).to.be.eq(undefined);
    expect(promotion.maxDiscountAmount ).to.be.eq(undefined);
    expect(promotion.minBillAmount).to.be.eq(undefined);
    expect(promotion.productId).to.be.eq(undefined);
  });
  it('throws error when percentageAmount is incorrect', function () {
    const promotion = new Promotion();
    try {
      promotion.percentageDiscount = -100;
      expect.fail('Negative percentage is not allowed');
    } catch (error: any) {
      expect(error.message).to.be.eq('Percentage should be between 0 - 100');
    }
  });
  it('throws error when quantity is negative', function () {
    const promotion = new Promotion();
    try {
      promotion.quantity = -10;
      expect.fail('Negative quantity is not allowed');
    } catch (error: any) {
      expect(error.message).to.be.eq('Quantity cannot be negative');
    }
  });
  it('throws error when maxDiscount is negative', function () {
    const promotion = new Promotion();
    try {
      promotion.maxDiscountAmount = -5;
      expect.fail('Negative maxDiscount is not allowed');
    } catch (error: any) {
      expect(error.message).to.be.eq('Maximum discount amount cannot be negative');
    }
  });
  it('throws error when minBillAmount is negative', function () {
    const promotion = new Promotion();
    try {
      promotion.minBillAmount = -20;
      expect.fail('Negative minBillAmount is not allowed');
    } catch (error: any) {
      expect(error.message).to.be.eq('Promotion Bill amount cannot be negative');
    }
  });
});
