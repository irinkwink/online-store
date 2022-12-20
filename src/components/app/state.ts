import { IProduct, IState } from '../../types/interfaces';

class State {
  state: IState;

  constructor() {
    this.state = {
      products: [],
      settings: {
        cart: [],
        catalogPage: {
          display: 'tiles',
          sort: 'initial',
          filters: {
            brand: 'initial',
            category: 'initial',
            price: [0, 10000],
            stock: [0, 100],
          },
        },
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

  saveDisplay(display: string) {
    this.state.settings.catalogPage.display = display;
    this.saveState();
  }
}

export default State;
