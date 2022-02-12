import ACart from './ACart';
import { IProduct } from '../interfaces/IProduct';

export default class Cart extends ACart {
  constructor() {
    super();
  }

  scan(product: IProduct) {
    if (!this.isInstanceOfProduct(product)) {
      throw new Error('Invalid Product instance');
    }
    const products = this.basket.get(product.id) ?? [];
    products.push(product);
    this.basket.set(product.id, products);
    this.calculateGrossAmount();
  }

  protected calculateGrossAmount() {
    this._grossAmount = 0;
    this.basket.forEach((products) => {
      let sum = products.reduce((acc, product) => acc + product.amount, 0);
      this._grossAmount += sum;
    });
  }

  private isInstanceOfProduct(data: any): data is IProduct {
    return 'name' in data && 'id' in data && 'amount' in data;
  }
}
