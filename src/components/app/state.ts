import { IProduct, IState } from '../../types/interfaces';
import { CartTotal } from '../../types/types';

class State {
  private state: IState;

  public constructor() {
    this.state = {
      products: [],
      error: '',
      onlineStoreSettings: {
        cart: [],
        promoCodes: [],
      },
    };
  }

  public getState(): IState {
    return this.state;
  }

  public loadState(): void {
    const dataJSON = localStorage.getItem('online-store-settings');
    if (dataJSON) {
      this.state.onlineStoreSettings = JSON.parse(dataJSON);
    }
  }

  private saveState(): void {
    localStorage.setItem('online-store-settings', JSON.stringify(this.state.onlineStoreSettings));
  }

  public saveProducts(data: IProduct[]): void {
    this.state.products = data;
  }

  public saveError(error: string): void {
    this.state.error = error;
  }

  public addProductToCart(id: number, count = 1): void {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.onlineStoreSettings.cart.push({ id: id, num: count });
    } else {
      this.state.onlineStoreSettings.cart[index].num += count;
    }
    this.saveState();
  }

  public deleteItemFromCart(id: number, count = 1): void {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1 && this.state.onlineStoreSettings.cart[index].num !== 1) {
      this.state.onlineStoreSettings.cart[index].num -= count;
    }
    this.saveState();
  }

  public removeProductFromCart(id: number): void {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.onlineStoreSettings.cart.push({ id: id, num: 1 });
    } else {
      this.state.onlineStoreSettings.cart.splice(index, 1);
    }
    this.saveState();
  }

  public calculateCartTotal(): CartTotal {
    const products = this.state.products;
    const cart = this.state.onlineStoreSettings.cart;

    const cartTotal: CartTotal = cart.reduce(
      (acc, item) => {
        acc.productsNum += item.num;
        const price = products.find((product) => product.id === item.id)?.price;
        if (price) {
          acc.totalPrice += price * item.num;
        }
        return acc;
      },
      {
        productsNum: 0,
        totalPrice: 0,
      }
    );

    return cartTotal;
  }

  public addCodeToSettings(code: string): void {
    const appliedPromoCodes = this.state.onlineStoreSettings.promoCodes;
    appliedPromoCodes.push(code.toUpperCase());
    this.saveState();
  }

  public dropCodeFromSetting(code: string): void {
    const appliedPromoCodes = this.state.onlineStoreSettings.promoCodes;
    const index = appliedPromoCodes.indexOf(code);
    appliedPromoCodes.splice(index, 1);
    this.saveState();
  }
  private clear() {
    const settings = this.getState().onlineStoreSettings;
    settings.cart = [];
    settings.promoСodes = [];
    this.saveState();
  }
  public clearCart() {
    this.clear();
  }
}

export default State;
