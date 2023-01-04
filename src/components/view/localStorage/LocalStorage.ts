import { IProductInLS } from '../../../types/interfaces';
import State from '../../app/state';
export class LocalStorageUtility {
  keyName: string;
  state: State;

  constructor(state: State) {
    this.keyName = 'products';
    this.state = state;
  }
  getProducts(): IProductInLS[] {
    const LocaleStorageProducts = localStorage.getItem(this.keyName);
    if (LocaleStorageProducts) {
      return JSON.parse(LocaleStorageProducts);
    } else {
      return [{ id: null, num: 0 }];
    }
  }
  updateHeaderCart(): void {
    const headerCartNum: HTMLElement | null = document.querySelector('.header__cart-text.header__cart-number');
    const productsInCart: IProductInLS[] = this.getProducts();
    let res = 0;
    productsInCart.forEach((product) => (res += product.num));
    if (headerCartNum) {
      headerCartNum.innerHTML = String(res);
    }
  }
  addProductsToLS(id: number): void {
    const products: IProductInLS[] = this.getProducts();
    const ind: number = products.findIndex((product) => product.id === id);
    const filtered = products.filter((product) => product.id === id);
    if (filtered.length) {
      products.splice(ind, 1);
    } else {
      products.push({ id: id, num: 1, btnState: true });
    }
    localStorage.setItem('products', JSON.stringify(products));
  }
  increaseNum(productID: number) {
    const products: IProductInLS[] = this.getProducts();
    products.forEach(function (product) {
      if (product.id === productID) {
        product.num++;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
  }
  decreaseNum(productID: number) {
    const products: IProductInLS[] = this.getProducts();
    products.forEach(function (product) {
      if (product.id === productID) {
        product.num--;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
  }
  isExist(id: number): boolean {
    const products: IProductInLS[] = this.getProducts();
    const ind: number = products.findIndex((product) => product.id === id);
    let btnState;
    if (ind === -1) {
      btnState = false;
    } else {
      btnState = true;
    }
    return btnState;
  }
  updateCartBtn(btnState: boolean): string {
    let textBtn: string;
    if (btnState) {
      textBtn = 'Add to cart';
    } else {
      textBtn = 'Remove from cart';
    }
    return textBtn;
  }
}

export default LocalStorageUtility;
