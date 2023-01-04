import CartPageController from '../controller/cartPage/cartPageController';
import CatalogPageController from '../controller/catalogPage/catalogPageController';
import DataController from '../controller/dataController';
import LocalStorageUtility from '../view/localStorage/LocalStorage';
import State from './state';
import ProductPageController from '../controller/productPage/productPageController';

class App {
  state: State;
  dataController: DataController;
  catalogPage: CatalogPageController;
  cartPage: CartPageController;
  productPage: ProductPageController;
  localStorage: LocalStorageUtility;

  constructor() {
    this.state = new State();
    this.dataController = new DataController();
    this.catalogPage = new CatalogPageController(this.state);
    this.cartPage = new CartPageController(this.state);
    this.productPage = new ProductPageController(this.state);
    this.localStorage = new LocalStorageUtility();
  }

  async start() {
    this.state.loadState();
    const data = await this.dataController.getProducts();
    this.state.saveProducts(data.products);
    this.catalogPage.start();
    this.cartPage.start();
    this.productPage.start();
  }
}

export default App;
