import { ProductsPerPage } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import { addSearchParamToUrl, deleteSearchParamFromUrl, getSearchParamsFromUrl } from '../../router/urlController';
import PaginationView from '../../view/catalogPage/paginationView';

class Pagination {
  view: PaginationView;
  products: IProduct[];
  callback: (data: IProduct[]) => void;
  pages: number;
  page: number;
  type: keyof typeof ProductsPerPage;

  constructor(callback: (data: IProduct[]) => void) {
    this.view = new PaginationView();
    this.products = [];
    this.callback = callback;
    this.pages = 0;
    this.page = 1;
    this.type = 'desktop';
  }

  showProducts() {
    const firstProduct = ProductsPerPage[this.type] * (this.page - 1);
    const lastProduct = ProductsPerPage[this.type] * this.page;
    const productsToDraw = this.products.slice(firstProduct, lastProduct);
    this.callback(productsToDraw);
  }

  init(products: IProduct[]) {
    this.products = products;

    if (this.products.length === 0) {
      deleteSearchParamFromUrl('page');
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
      this.showProducts();

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

      const paginationElem = document.querySelector('.pagination');
      if (paginationElem) {
        paginationElem.addEventListener('click', (e) => this.handlePagination(e));
      }
    }

    return ProductsPerPage[this.type];
  }

  drawPagination() {
    this.pages = Math.ceil(this.products.length / ProductsPerPage[this.type]);
    this.view.drawPagination(this.pages, this.page);
  }

  handlePagination(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const linkElem = target.closest('.pagination__link') || target.closest('.pagination__arrow');
      if (linkElem && (linkElem as HTMLElement).dataset.page) {
        const elem = linkElem as HTMLElement;
        if (elem.dataset.page) {
          this.page = +elem.dataset.page;
          this.showProducts();
          this.drawPagination();
          addSearchParamToUrl({ key: 'page', value: this.page.toString() });
        }
      }
    }
  }
}

export default Pagination;
