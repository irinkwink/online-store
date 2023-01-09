import { IProductLS } from '../../../types/interfaces';
import { deleteSearchParamFromUrl } from '../../router/urlController';
import PaginationController from '../paginationController';

class CartPaginationController extends PaginationController<IProductLS> {
  public constructor(callback: (data: IProductLS[]) => void) {
    super(callback);
  }

  public initPagination(products: IProductLS[], isCurrentPage = false): void {
    deleteSearchParamFromUrl('page');
    this.products = products;
    this.initPageLimit(isCurrentPage);
    super.init();
  }

  public initPageLimit(isCurrentPage: boolean): void {
    if (isCurrentPage) {
      deleteSearchParamFromUrl('page');
      if (this.limit > this.products.length) this.limit = this.products.length;
    } else {
      this.limit = this.products.length === 0 ? 1 : this.products.length;
    }
  }
}

export default CartPaginationController;
