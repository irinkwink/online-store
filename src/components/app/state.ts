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

  public removeProductFromCart(id: number) {
    const index: number = this.state.onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.onlineStoreSettings.cart.push({ id: id, num: 1 });
    } else {
      this.state.onlineStoreSettings.cart.splice(index, 1);
    }
    this.saveState();
  }
}

export default State;
