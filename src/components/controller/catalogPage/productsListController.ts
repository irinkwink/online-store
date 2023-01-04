import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import { deleteSearchParamFromUrl } from '../../routes/urlController';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import Pagination from './paginationController';

class ProductsList {
  view: CatalogPageView;
  pagination: Pagination;

  constructor(state: State) {
    this.view = new CatalogPageView(state);
    this.pagination = new Pagination((products) => this.view.drawProducts(products));
  }

  init(products: IProduct[]) {
    this.view.checkDisplay();
    deleteSearchParamFromUrl('page');

    this.pagination.init(products);

    if (products.length === 0) {
      this.view.drawProductsEmptyMessage();
    }

    this.view.updateCount(products.length);
  }
}

export default ProductsList;
