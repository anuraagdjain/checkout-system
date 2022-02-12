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
  maxDiscount?: number;
  productId?: number;
  percentageDiscount?: number;
}
