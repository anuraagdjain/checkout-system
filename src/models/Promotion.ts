import IPromotion, { PromotionType } from '../interfaces/IPromotion';

export default class Promotion implements IPromotion {
  promotionType: PromotionType;
  productId?: number;

  private _percentageDiscount?: number;
  private _minBillAmount?: number;
  private _maxDiscountAmount?: number;
  private _quantity?: number;
  private _discountAmount?: number;

  constructor() {
    this.promotionType = PromotionType.NONE;
  }

  public set percentageDiscount(value: number | undefined) {
    if (value && (value < 0 || value > 100)) throw new Error('Percentage should be between 0 - 100');
    this._percentageDiscount = value;
  }

  public get percentageDiscount(): number | undefined {
    return this._percentageDiscount;
  }

  public set minBillAmount(value: number | undefined) {
    if (value && value < 0) throw new Error('Promotion Bill amount cannot be negative');
    this._minBillAmount = value;
  }

  public get minBillAmount(): number | undefined {
    return this._minBillAmount;
  }

  public set maxDiscountAmount(value: number | undefined) {
    if (value && value < 0) throw new Error('Maximum discount amount cannot be negative');
    this._maxDiscountAmount = value;
  }

  public get maxDiscountAmount(): number | undefined {
    return this._maxDiscountAmount;
  }

  public set discountAmount(value: number | undefined) {
    if (value && value < 0) throw new Error('Discount amount cannot be negative');
    this._discountAmount = value;
  }

  public get discountAmount(): number | undefined {
    return this._discountAmount;
  }

  public set quantity(value: number | undefined) {
    if (value && value < 0) throw new Error('Quantity cannot be negative');
    this._quantity = value;
  }

  public get quantity(): number | undefined {
    return this._quantity;
  }
}
