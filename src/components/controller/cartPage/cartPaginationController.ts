import { IProductLS } from '../../../types/interfaces';
import { addSearchParamToUrl, deleteSearchParamFromUrl } from '../../router/urlController';
import PaginationController from '../paginationController';

class CartPaginationController extends PaginationController<IProductLS> {
  public constructor(callback: (data: IProductLS[]) => void) {
    super(callback);
  }

  public initPagination(products: IProductLS[], isCurrentPage = false): void {
    this.products = products;
    this.initPageLimit(isCurrentPage);
    super.init();
  }

  public initPageLimit(isCurrentPage: boolean): void {
    if (isCurrentPage) {
      if ((this.page - 1) * this.limit >= this.products.length) {
        addSearchParamToUrl({ key: 'page', value: (this.page - 1).toString() });
      }
      if (this.limit > this.products.length) this.limit = this.products.length;
    } else {
      deleteSearchParamFromUrl('page');
      this.limit = this.products.length === 0 ? 1 : this.products.length;
    }
  }
}

export default CartPaginationController;
