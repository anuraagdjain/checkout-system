export enum PromotionType {
  BILL_DISCOUNT,
  PERCENTAGE,
  PRODUCT_DISCOUNT,
  NONE,
}
export default interface IPromotion {
  promotionType: PromotionType;
  quantity?: number;
  minBillAmount?: number;
  maxDiscountAmount?: number;
  productId?: number;
  percentageDiscount?: number;
  discountAmount?: number;
}
