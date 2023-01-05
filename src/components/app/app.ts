import CartPageController from '../controller/cartPage/cartPageController';
import CatalogPageController from '../controller/catalogPage/catalogPageController';
import DataController from '../controller/dataController';
import LocalStorageUtility from '../view/localStorage/LocalStorage';
import State from './state';
import ProductPageController from '../controller/productPage/productPageController';
import Router from '../router/router';
import Page404Controller from '../controller/page404/page404Controller';

class App {
  state: State;
  router: Router;
  dataController: DataController;
  catalogPage: CatalogPageController;
  cartPage: CartPageController;
  productPage: ProductPageController;
  page404: Page404Controller;
  localStorage: LocalStorageUtility;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();

    this.catalogPage = new CatalogPageController(this.state);
    this.productPage = new ProductPageController(this.state);
    this.cartPage = new CartPageController(this.state);
    this.page404 = new Page404Controller(this.state);

    this.localStorage = new LocalStorageUtility();

    this.router = new Router([this.catalogPage, this.productPage, this.cartPage, this.page404]);
  }

  async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);

    this.router.start();
    // this.catalogPage.start();
    // this.cartPage.start();
    // this.productPage.start();
  }
}

export default App;
