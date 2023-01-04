import { IProduct, IState } from '../../types/interfaces';

class State {
  private state: IState;

  constructor() {
    this.state = {
      products: [],
      cart: [],
    };
  }

  public getState() {
    return this.state;
  }

  public loadState() {
    const dataJSON = localStorage.getItem('products');
    if (dataJSON) {
      this.state.cart = JSON.parse(dataJSON);
    }
  }

  private saveState() {
    localStorage.setItem('products', JSON.stringify(this.state.cart));
  }

  public saveProducts(data: IProduct[]) {
    this.state.products = data;
  }

  public addProductToCart(id: number, count = 1) {
    const index: number = this.state.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.cart.push({ id: id, num: count });
    } else {
      this.state.cart[index].num += count;
    }
    this.saveState();
  }

  public removeProductFromCart(id: number) {
    const index: number = this.state.cart.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      this.state.cart.push({ id: id, num: 1 });
    } else {
      this.state.cart.splice(index, 1);
    }
    this.saveState();
  }
}

export default State;
