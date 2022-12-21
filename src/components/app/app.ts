import { IProductsData } from '../../types/interfaces';
import AppController from '../controller/controller';
import AppView from '../view/AppView';
import LocalStorageUtility from '../view/localStorage/LocalStorage';
import Cart from '../view/cart/cart';

class App {
  controller: AppController;
  view: AppView;
  localStorageUtility: LocalStorageUtility;
  cart: Cart;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.localStorageUtility = new LocalStorageUtility();
    this.cart = new Cart();
  }

  start() {
    this.controller.getProducts((data: IProductsData) => this.view.drawProducts(data));
    const productStore = this.localStorageUtility.getProducts();
    this.controller.checkCart((data: IProductsData) => this.cart.identityProducts(productStore, data));
    this.controller.getCategories((data: string[]) => this.view.drawCategories(data));
    document.querySelector('.catalog__filter-btn')?.addEventListener('click', () => this.view.showFilters());
    document.querySelector('.filter__title')?.addEventListener('click', () => this.view.hideFilters());
    document.querySelector('.display')?.addEventListener('click', (e) => this.view.checkDisplay(e));
  }
}

export default App;
