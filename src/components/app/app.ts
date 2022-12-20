import { IProductsData } from '../../types/interfaces';
import AppController from '../controller/controller';
import AppView from '../view/AppView';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    this.controller.getProducts((data: IProductsData) => this.view.drawProducts(data));
    this.controller.getCategories((data: string[]) => this.view.drawCategories(data));
    document.querySelector('.catalog__filter-btn')?.addEventListener('click', () => this.view.showFilters());
    document.querySelector('.filter__title')?.addEventListener('click', () => this.view.hideFilters());
    document.querySelector('.display')?.addEventListener('click', (e) => this.view.checkDisplay(e));
  }
}

export default App;
