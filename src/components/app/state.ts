import { IProduct, IState } from '../../types/interfaces';

class State {
  state: IState;

  constructor() {
    this.state = {
      products: [],
      settings: {
        cart: [],
      },
    };
  }

  loadState() {
    const dataJSON = localStorage.getItem('online-store-settings');
    if (dataJSON) {
      this.state.settings = JSON.parse(dataJSON);
    }
  }

  saveState() {
    localStorage.setItem('online-store-settings', JSON.stringify(this.state.settings));
  }

  saveProducts(data: IProduct[]) {
    this.state.products = data;
    console.log('this.state: ', this.state);
  }

  getState() {
    return this.state;
  }
}

export default State;
