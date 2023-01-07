import DataController from '../controller/dataController';
import LocalStorageUtility from '../view/localStorage/LocalStorage';
import State from './state';
import Router from '../router/router';
import TemplatePageController from '../controller/templatePage/templatePageController';

class App {
  state: State;
  router: Router;
  dataController: DataController;

  templatePage: TemplatePageController;
  localStorage: LocalStorageUtility;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();

    this.templatePage = new TemplatePageController(this.state);

    this.localStorage = new LocalStorageUtility();

    this.router = new Router(this.templatePage);
  }

  async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);
    this.templatePage.start();

    this.router.start();
    // this.catalogPage.start();
    // this.cartPage.start();
    // this.productPage.start();
  }
}

export default App;
