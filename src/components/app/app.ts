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
    document.querySelector('.display')?.addEventListener('click', this.view.checkDisplay);
  }
}

export default App;
