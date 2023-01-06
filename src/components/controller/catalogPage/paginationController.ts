import { ProductsPerPage } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import { addSearchParamToUrl, deleteSearchParamFromUrl, getSearchParamsFromUrl } from '../../router/urlController';
import PaginationView from '../../view/catalogPage/paginationView';

class Pagination {
  public view: PaginationView;
  private products: IProduct[];
  private cbDrawProducts: (data: IProduct[]) => void;
  private pages: number;
  private page: number;
  private type: keyof typeof ProductsPerPage;

  constructor(callback: (data: IProduct[]) => void) {
    this.view = new PaginationView();
    this.products = [];
    this.cbDrawProducts = callback;
    this.pages = 0;
    this.page = 1;
    this.type = 'desktop';
  }

  private drawProducts() {
    const firstProduct = ProductsPerPage[this.type] * (this.page - 1);
    const lastProduct = ProductsPerPage[this.type] * this.page;
    const productsToDraw = this.products.slice(firstProduct, lastProduct);
    this.cbDrawProducts(productsToDraw);
  }

  public init(products: IProduct[]) {
    this.products = products;

    if (this.products.length === 0) {
      deleteSearchParamFromUrl('page');
      this.cbDrawProducts(this.products);
    } else {
      const searchParams = getSearchParamsFromUrl();

      const pageParam = searchParams.filter((item) => item.key === 'page');
      if (pageParam.length !== 0) {
        this.page = +pageParam[0].value;
      } else {
        this.page = 1;
      }

      if (window.innerWidth < 670) {
        this.type = 'mobile';
      } else if (window.innerWidth < 1380) {
        this.type = 'tablet';
      } else {
        this.type = 'desktop';
      }

      this.drawPagination();
      this.drawProducts();

      window.addEventListener('resize', () => {
        if (window.innerWidth <= 670 && this.type !== 'mobile') {
          this.type = 'mobile';
          this.drawPagination();
        }

        if (window.innerWidth <= 1380 && this.type !== 'tablet') {
          this.type = 'tablet';
          this.drawPagination();
        }

        if (window.innerWidth > 1380 && this.type !== 'desktop') {
          this.type = 'desktop';
          this.drawPagination();
        }
      });

      if (this.view.pagination) {
        this.view.pagination.addEventListener('click', (e) => this.handlePagination(e));
      }
    }

    return ProductsPerPage[this.type];
  }

  private drawPagination() {
    this.pages = Math.ceil(this.products.length / ProductsPerPage[this.type]);
    this.view.draw(this.pages, this.page);
  }

  private handlePagination(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const linkElem = target.closest('.pagination__link') || target.closest('.pagination__arrow');
      if (linkElem && (linkElem as HTMLElement).dataset.page) {
        const elem = linkElem as HTMLElement;
        if (elem.dataset.page) {
          this.page = +elem.dataset.page;
          this.drawPagination();
          this.drawProducts();
          addSearchParamToUrl({ key: 'page', value: this.page.toString() });
        }
      }
    }
  }
}

export default Pagination;
