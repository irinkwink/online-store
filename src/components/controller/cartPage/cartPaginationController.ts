import { IProductLS } from '../../../types/interfaces';
import { deleteSearchParamFromUrl } from '../../router/urlController';
import PaginationController from '../paginationController';

class CartPaginationController extends PaginationController<IProductLS> {
  constructor(callback: (data: IProductLS[]) => void) {
    super(callback);
  }

  public initPagination(products: IProductLS[], isCurrentPage = false) {
    deleteSearchParamFromUrl('page');
    this.products = products;
    this.initPageLimit(isCurrentPage);
    super.init();
  }

  public initPageLimit(isCurrentPage: boolean) {
    if (isCurrentPage) {
      deleteSearchParamFromUrl('page');
    } else {
      this.limit = this.products.length === 0 ? 1 : this.products.length;
    }
  }
}

export default CartPaginationController;
