//import { IProductLocalSt } from '../../../types/interfaces';
export class LocalStorageUtility {
  keyName: string;

  constructor() {
    this.keyName = 'products';
  }
  getProducts(): [] {
    const LocaleStorageProducts = localStorage.getItem(this.keyName);
    if (LocaleStorageProducts) {
      console.log(JSON.parse(LocaleStorageProducts));
      return JSON.parse(LocaleStorageProducts);
    }
    //console.log([]);
    return [];
  }
  putProducts(id: number): number[] | boolean {
    const products: number[] = this.getProducts();
    let isPushed = false;
    const index: number = products.indexOf(id);
    if (index === -1) {
      products.push(id);
      isPushed = true;
    } else {
      products.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    console.log(products, isPushed);
    return products && isPushed;
  }
}

export const storageUtility = new LocalStorageUtility();

export default LocalStorageUtility;
