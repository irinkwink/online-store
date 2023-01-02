import { IProductInLS, IProduct } from '../../../types/interfaces';
import State from '../../app/state';
export class LocalStorageUtility {
  keyName: string;
  savedProducts: number | null;

  constructor() {
    this.keyName = 'products';
    this.savedProducts = null;
  }
  start(state: State) {
    console.log('storage Page');
    const products = state.getState();
    console.log(products.products);
    console.log(this.getSavedProducts());
  }
  setSavedProducts(id: number) {
    this.savedProducts = id;
    this.getSavedProducts();
  }
  getSavedProducts(): number | null {
    return this.savedProducts;
  }

  //   getProducts(): IProduct[] {
  //     const LocaleStorageProducts = localStorage.getItem(this.keyName);
  //     if (LocaleStorageProducts) {
  //       return JSON.parse(LocaleStorageProducts);
  //     } else {
  //       return [
  //         {
  //           id: 0,
  //           title: '',
  //           description: '',
  //           price: 0,
  //           discountPercentage: 0,
  //           rating: 0,
  //           stock: 0,
  //           brand: '',
  //           category: '',
  //           thumbnail: '',
  //           images: [''],
  //           num: 1,
  //         },
  //       ];
  //     }
  //   }
  //   updateHeaderCart(products: number): void {
  //     const headerCartNum: HTMLElement | null = document.querySelector('.header__cart-text.header__cart-number');
  //     console.log(headerCartNum);
  //     if (headerCartNum) {
  //       headerCartNum.innerHTML = String(products);
  //     }
  //   }
  //   addProductsToLS(id: number): number {
  //     return id;
  //     //localStorage.setItem('products', JSON.stringify(products));
  //   }
  //   identityProducts(state: State): void {
  //     const id = this.addProductsToLS
  //     const products = state.getState().products;
  //     let res = products.filter((product) => product.id === id)
  //     localStorage.setItem('products', JSON.stringify(res));
  //     console.log(res);
  //   }
  //   isExist(id: number): boolean {
  //     const products: IProduct[] = this.getProducts();
  //     const ind: number = products.findIndex((product) => product.id === id);
  //     let btnState;
  //     if (ind === -1) {
  //       btnState = false;
  //     } else {
  //       btnState = true;
  //     }
  //     return btnState;
  //   }
  //   updateCartBtn(btnState: boolean): string {
  //     let textBtn: string;
  //     if (btnState) {
  //       textBtn = 'Add to cart';
  //     } else {
  //       textBtn = 'Remove from cart';
  //     }
  //     return textBtn;
  //   }
}
export const storageUtility = new LocalStorageUtility();

export default LocalStorageUtility;
