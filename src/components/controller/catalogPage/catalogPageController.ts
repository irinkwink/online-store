import State from '../../app/state';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import Filter from './filterController';

class CatalogPageController {
  view: CatalogPageView;
  filter: Filter;

  constructor() {
    this.view = new CatalogPageView();
    this.filter = new Filter();
  }

  start(state: State) {
    console.log('Catalog Page');

    this.view.checkDisplay();

    this.filter.init(state, (products) => this.view.drawProducts(products));
  }
}

export default CatalogPageController;
