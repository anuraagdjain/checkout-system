import { IProduct } from '../interfaces/IProduct';

export default abstract class ACart {
  protected _grossAmount: number;
  protected _netAmount: number;
  basket: Map<number, IProduct[]>;

  constructor() {
    this.basket = new Map();
    this._grossAmount = 0;
    this._netAmount = 0;
  }

  public get grossAmount(): number {
    return this._grossAmount;
  }

  public get netAmount(): number {
    return this._netAmount;
  }

  abstract scan(product: IProduct): void;
  protected abstract calculateGrossAmount(): void;
}
