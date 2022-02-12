import IPromotion, { PromotionType } from '../interfaces/IPromotion';

export default class Promotion implements IPromotion {
  promotionType: PromotionType;
  productId?: number;

  private _percentageDiscount?: number;
  private _minBillAmount?: number;
  private _maxDiscount?: number;
  private _quantity?: number;

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

  public set maxDiscount(value: number | undefined) {
    if (value && value < 0) throw new Error('Maximum discount amount cannot be negative');
    this._maxDiscount = value;
  }

  public get maxDiscount(): number | undefined {
    return this._maxDiscount;
  }

  public set quantity(value: number | undefined) {
    if (value && value < 0) throw new Error('Quantity cannot be negative');
    this._quantity = value;
  }

  public get quantity(): number | undefined {
    return this._quantity;
  }
}
