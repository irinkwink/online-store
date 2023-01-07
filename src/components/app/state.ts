import { IProduct, IState } from '../../types/interfaces';

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

  public getTotalNumInCart(): number {
    const cart = this.getState().onlineStoreSettings.cart;
    let summ = 0;
    cart.forEach((cartItem) => (summ += cartItem.num));
    return summ;
  }
  public checkPromoCodes(code: string): boolean {
    const promocodes = this.state.onlineStoreSettings.promoСodes;
    code = code.toUpperCase();
    if ((code === 'RSS' || code === 'EPAM') && !promocodes.includes(code)) {
      return true;
    } else {
      return false;
    }
  }
  public addCodeToSettings(code: string) {
    const promocodes = this.state.onlineStoreSettings.promoСodes;
    promocodes.push(code.toUpperCase());
    this.saveState();
  }

  public dropCodeFromSetting(code: string) {
    const promocodes = this.state.onlineStoreSettings.promoСodes;
    const index = promocodes.indexOf(code);
    promocodes.splice(index, 1);
    this.saveState();
  }
}

export default State;
