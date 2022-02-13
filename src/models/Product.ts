import IProduct from '../interfaces/IProduct';

export default class Product implements IProduct {
  id: number;
  name: string;
  private _amount: number = 0;

  constructor(id: number, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
  public get amount(): number {
    return this._amount;
  }

  public set amount(value: number) {
    if (value < 0) throw new Error('Amount cannot be less than 0.');
    this._amount = value;
  }
}
