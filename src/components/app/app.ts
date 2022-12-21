import CatalogPageController from '../controller/catalogPage/catalogPageController';
import DataController from '../controller/dataController';
import State from './state';

class App {
  state: State;
  dataController: DataController;
  catalogPage: CatalogPageController;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();
    this.catalogPage = new CatalogPageController();
  }

  async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);

    this.catalogPage.start(this.state);
  }
}

export default App;
