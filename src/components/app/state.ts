import { IProduct, IState } from '../../types/interfaces';
import { CartTotal } from '../../types/types';

class State {
  private state: IState;

  constructor() {
    this.state = {
      products: [],
      onlineStoreSettings: {
        cart: [],
        promoСodes: [],
      },
    };
  }

  public getState() {
    return this.state;
  }

  public loadState() {
    const dataJSON = localStorage.getItem('online-store-settings');
    if (dataJSON) {
      this.state.onlineStoreSettings = JSON.parse(dataJSON);
    }
  }

  private saveState() {
    localStorage.setItem('online-store-settings', JSON.stringify(this.state.onlineStoreSettings));
  }

  public saveProducts(data: IProduct[]) {
    this.state.products = data;
  }

  public addProductToCart(id: number, count = 1) {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.onlineStoreSettings.cart.push({ id: id, num: count });
    } else {
      this.state.onlineStoreSettings.cart[index].num += count;
    }
    this.saveState();
  }

  public deleteItemFromCart(id: number, count = 1) {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1 && this.state.onlineStoreSettings.cart[index].num !== 1) {
      this.state.onlineStoreSettings.cart[index].num -= count;
    } else {
      console.log('disabled');
    }
    this.saveState();
  }

  public removeProductFromCart(id: number) {
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

  public checkPromoCodes(code: string): boolean {
    const promocodes = this.state.onlineStoreSettings.promoСodes;
    code = code.toUpperCase();
    console.log(promocodes.includes(code));
    console.log(promocodes);
    if ((code === 'RSS' || code === 'EPAM') && !promocodes.includes(code)) {
      return true;
    } else {
      return false;
    }
  }
  public addCodeToSettings(code: string) {
    const promocodes = this.state.onlineStoreSettings.promoСodes;
    console.log(promocodes.includes(code));
    promocodes.push(code.toUpperCase());
    this.saveState();
  }
}

export default State;
