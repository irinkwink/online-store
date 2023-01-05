import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import { deleteSearchParamFromUrl } from '../../router/urlController';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import Pagination from './paginationController';

class ProductsList {
  state: State;
  view: CatalogPageView;
  pagination: Pagination;

  constructor(state: State) {
    this.state = state;
    this.view = new CatalogPageView(state);
    this.pagination = new Pagination((products) => this.view.drawProducts(products));
  }

  public init(products: IProduct[]) {
    this.view.checkDisplay();
    deleteSearchParamFromUrl('page');

    this.pagination.init(products);

    if (products.length === 0) {
      this.view.drawProductsEmptyMessage();
    }

    this.view.updateCount(products.length);

    this.view.products.productsListElem?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('.goods-item__to-cart')) {
        this.updateCart(target as HTMLButtonElement);
      }
    });
  }

  private updateCart(btn: HTMLButtonElement) {
    this.view.updateBtnToCart(btn);
    const id = btn.dataset.productId;
    if (id !== undefined) {
      if (btn.dataset.isInCart === 'true') {
        this.state.removeProductFromCart(+id);
      } else {
        this.state.addProductToCart(+id);
      }
    }
  }
}

export default ProductsList;
