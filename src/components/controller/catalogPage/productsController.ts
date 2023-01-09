import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import ProductsView from '../../view/catalogPage/productsView';
import CatalogPaginationController from './catalogPaginationController';

class ProductsController {
  private state: State;
  private cbUpdateCount: (number: number) => void;
  private cbUpdateCartTotal: () => void;
  public view: ProductsView;
  public pagination: CatalogPaginationController;

  public constructor(state: State, cbUpdateCount: (number: number) => void, cbUpdateCartTotal: () => void) {
    this.cbUpdateCount = cbUpdateCount;
    this.cbUpdateCartTotal = cbUpdateCartTotal;
    this.state = state;
    this.view = new ProductsView(state);
    this.pagination = new CatalogPaginationController((products) => this.view.draw(products));
  }

  public init(products: IProduct[]): void {
    this.pagination.initPagination(products);

    this.cbUpdateCount(products.length);

    this.view.productsList?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('.goods-item__to-cart')) {
        this.updateCart(target as HTMLButtonElement);
      }
    });
  }

  private updateCart(btn: HTMLButtonElement): void {
    this.view.updateBtnToCart(btn);
    const id = btn.dataset.productId;
    if (id !== undefined) {
      if (btn.dataset.isInCart === 'true') {
        this.state.removeProductFromCart(+id);
      } else {
        this.state.addProductToCart(+id);
      }
      this.cbUpdateCartTotal();
    }
  }
}

export default ProductsController;
