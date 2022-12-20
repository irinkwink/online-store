import { IProductsData } from '../../types/interfaces';
import CatalogPage from '../controller/catalogPageController';
import AppController from '../controller/controller';
import State from './state';

class App {
  state: State;
  controller: AppController;
  catalogPage: CatalogPage;

  constructor() {
    this.state = new State();
    this.controller = new AppController();
    this.catalogPage = new CatalogPage();
  }

  start() {
    this.state.loadState();
    this.controller.getProducts((data: IProductsData) => this.state.saveProducts(data.products));
    this.catalogPage.start(this.state);
  }
}

export default App;
