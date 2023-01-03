import CardPageController from '../controller/cardPage/cardPageController';
import CartPageController from '../controller/cartPage/cartPageController';
import CatalogPageController from '../controller/catalogPage/catalogPageController';
import DataController from '../controller/dataController';
import LocalStorageUtility from '../view/localStorage/LocalStorage';
import State from './state';

class App {
  state: State;
  dataController: DataController;
  catalogPage: CatalogPageController;
  cartPage: CartPageController;
  cardPage: CardPageController;
  localStorage: LocalStorageUtility;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();
    this.catalogPage = new CatalogPageController();
    this.cartPage = new CartPageController();
    this.cardPage = new CardPageController();
    this.localStorage = new LocalStorageUtility();
  }

  async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);
    this.catalogPage.start(this.state);
    this.cartPage.start(this.state);
    this.cardPage.start(this.state);
  }
}

export default App;
