import { IProductsData } from '../../types/interfaces';
import State from '../app/state';
import CatalogPageView from '../view/catalogPageView';

import AppController from './controller';
import Filter from './filterController';

class CatalogPage {
  controller: AppController;
  view: CatalogPageView;
  filter: Filter;

  constructor() {
    this.controller = new AppController();
    this.view = new CatalogPageView();
    this.filter = new Filter();
  }

  start(state: State) {
    console.log('state: ', state);
    console.log('Catalog Page');

    this.view.checkDisplay(state);

    this.controller.getProducts((data: IProductsData) => this.view.drawProducts(data));
    this.controller.getCategories((data: string[]) => this.view.drawCategories(data));
    document.querySelector('.catalog__filter-btn')?.addEventListener('click', () => this.view.showFilters());
    document.querySelector('.filter__title')?.addEventListener('click', () => this.view.hideFilters());

    this.filter.init();
  }
}

export default CatalogPage;
