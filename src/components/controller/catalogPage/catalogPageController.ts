import State from '../../app/state';
import Filter from './filterController';
import ProductsList from './productsListController';

class CatalogPageController {
  state: State;
  productsList: ProductsList;
  filter: Filter;

  constructor(state: State) {
    this.state = state;
    this.productsList = new ProductsList(state);
    this.filter = new Filter();
  }

  start() {
    console.log('Catalog Page');
    this.filter.init(this.state.getState().products, (products) => this.productsList.init(products));
  }
}

export default CatalogPageController;
