import { IProduct } from '../../../types/interfaces';
import { deleteSearchParamFromUrl } from '../../routes/urlController';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import Pagination from './paginationController';

class ProductsList {
  view: CatalogPageView;
  pagination: Pagination;

  constructor() {
    this.view = new CatalogPageView();
    this.pagination = new Pagination((products) => this.view.drawProducts(products));
  }

  init(products: IProduct[]) {
    console.log('products: ', products);

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
