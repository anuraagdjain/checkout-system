import ACart from './ACart';
import IProduct from '../interfaces/IProduct';
import IPromotion, { PromotionType } from '../interfaces/IPromotion';

export default class Cart extends ACart {
  private promotionsMap: Map<PromotionType, any>;
  constructor(promotions?: IPromotion[]) {
    super();
    this.promotionsMap = new Map();
    this.createPromotionMap(promotions);
  }

  private createPromotionMap(promotions: IPromotion[] = []) {
    promotions.forEach((promotion) => {
      switch (promotion.promotionType) {
        case PromotionType.PERCENTAGE: {
          const percentageDiscounts = this.promotionsMap.get(PromotionType.PERCENTAGE) ?? [];
          percentageDiscounts.push(promotion);
          this.promotionsMap.set(PromotionType.PERCENTAGE, percentageDiscounts);
          break;
        }
        case PromotionType.PRODUCT_DISCOUNT: {
          const productDiscoutMap = this.promotionsMap.get(PromotionType.PRODUCT_DISCOUNT) ?? {};
          const productId = promotion.productId as number;
          if (!Object.hasOwnProperty.call(productDiscoutMap, productId as number)) {
            productDiscoutMap[productId] = promotion;
          }
          this.promotionsMap.set(PromotionType.PRODUCT_DISCOUNT, productDiscoutMap);
          break;
        }
        default: {
          console.log(`Unsupported promotion type - ${promotion.promotionType}`);
        }
      }
    });
  }

  public scan(product: IProduct): void {
    if (!this.isInstanceOfProduct(product)) {
      throw new Error('Invalid Product instance');
    }
    const products = this.basket.get(product.id) ?? [];
    products.push(product);
    this.basket.set(product.id, products);
    this.calculateGrossAmount();
    this.applyPercentagePromotion();
  }

  protected calculateGrossAmount(): void {
    this._grossAmount = 0;
    this.basket.forEach((products) => {
      let sum = products.reduce((acc, product) => acc + product.amount, 0);
      this._grossAmount += sum;
    });
  }

  private applyPercentagePromotion() {
    const promotions = this.promotionsMap.get(PromotionType.PERCENTAGE);
    if (!promotions) {
      console.log('No percentage promotion being applied.');
      return;
    }
    // apply max promotion for the customer.
    let maxDiscount = Number.MIN_SAFE_INTEGER;
    promotions.forEach((promotion: IPromotion) => {
      const promotionMaxDiscount = promotion.maxDiscount;
      if (this._grossAmount >= promotion.minBillAmount!) {
        const discount = (this._grossAmount * promotion.percentageDiscount!) / 100;
        maxDiscount = Math.max(discount, maxDiscount);
        if (promotionMaxDiscount && maxDiscount > promotionMaxDiscount) {
          maxDiscount = Math.min(maxDiscount, promotionMaxDiscount);
        }
      }
    });
    this._netAmount = Number((this._grossAmount - maxDiscount).toFixed(2));
  }

  private isInstanceOfProduct(data: any): data is IProduct {
    return 'name' in data && 'id' in data && 'amount' in data;
  }
}
