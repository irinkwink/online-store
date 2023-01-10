import DataController from '../controller/dataController';
import State from './state';
import Router from '../router/router';
import TemplatePageController from '../controller/templatePage/templatePageController';
import { Errors } from '../../types/enums';

class App {
  private state: State;
  private router: Router;
  private dataController: DataController;
  private templatePage: TemplatePageController;

  public constructor() {
    this.state = new State();
    this.dataController = new DataController();
    this.templatePage = new TemplatePageController(this.state);
    this.router = new Router(this.templatePage);
  }

  public async start(): Promise<void> {
    this.state.loadState();
    try {
      const data = await this.dataController.getProducts();
      if ('products' in data) {
        this.state.saveProducts(data.products);
      } else {
        this.state.saveError(Errors.dataError);
      }
    } catch {
      this.state.saveError(Errors.serverError);
    }

    this.templatePage.start();
    this.router.start();
  }
}

export default App;
