import DataController from '../controller/dataController';
//import LocalStorageUtility from '../view/localStorage/LocalStorage';
import State from './state';
import Router from '../router/router';
import TemplatePageController from '../controller/templatePage/templatePageController';

class App {
  private state: State;
  private router: Router;
  private dataController: DataController;
  private templatePage: TemplatePageController;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();

    this.templatePage = new TemplatePageController(this.state);

    this.router = new Router(this.templatePage);
  }

  public async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);
    this.templatePage.start();

    this.router.start();
  }
}

export default App;
