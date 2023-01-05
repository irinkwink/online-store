import State from '../../app/state';
import PageController from '../pageController';
import Filter from './filterController';
import ProductsList from './productsListController';

class CatalogPageController extends PageController {
  productsList: ProductsList;
  filter: Filter;

  constructor(state: State) {
    super(state);
    this.productsList = new ProductsList(state);
    this.filter = new Filter();
  }

  start() {
    console.log('Catalog Page');
    this.filter.init(this.state.getState().products, (products) => this.productsList.init(products));
  }
}

export default CatalogPageController;
