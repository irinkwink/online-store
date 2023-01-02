import State from '../../app/state';
import Filter from './filterController';
import ProductsList from './productsListController';

class CatalogPageController {
  productsList: ProductsList;
  filter: Filter;

  constructor() {
    this.productsList = new ProductsList();
    this.filter = new Filter();
  }

  start(state: State) {
    console.log('Catalog Page');
    this.filter.init(state, (products) => this.productsList.init(products));
  }
}

export default CatalogPageController;
