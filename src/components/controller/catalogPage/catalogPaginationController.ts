import { ProductsPerPage } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import PaginationController from '../paginationController';
class CatalogPaginationController extends PaginationController<IProduct> {
  private type: keyof typeof ProductsPerPage;

  constructor(callback: (data: IProduct[]) => void) {
    super(callback);
    this.type = 'desktop';
  }

  public initPagination(products: IProduct[]): void {
    this.products = products;
    this.initPageLimit();
    super.init();
  }

  public initPageLimit(): void {
    if (window.innerWidth < 670) {
      this.type = 'mobile';
    } else if (window.innerWidth < 1380) {
      this.type = 'tablet';
    } else {
      this.type = 'desktop';
    }

    this.limit = ProductsPerPage[this.type];

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 670 && this.type !== 'mobile') {
        this.type = 'mobile';
      }

      if (window.innerWidth <= 1380 && this.type !== 'tablet') {
        this.type = 'tablet';
      }

      if (window.innerWidth > 1380 && this.type !== 'desktop') {
        this.type = 'desktop';
      }
      this.limit = ProductsPerPage[this.type];
      this.drawPagination();
    });
  }
}

export default CatalogPaginationController;
