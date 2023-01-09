import { addSearchParamToUrl, deleteSearchParamFromUrl, getSearchParamValueFromUrl } from '../router/urlController';
import PaginationView from '../view/paginationView';

class PaginationController<T> {
  public view: PaginationView;
  protected products: T[];
  protected cbDrawProducts: (data: T[]) => void;
  protected pages: number;
  protected page: number;
  protected limit: number;

  constructor(callback: (data: T[]) => void) {
    this.view = new PaginationView();
    this.products = [];
    this.cbDrawProducts = callback;
    this.pages = 0;
    this.page = 1;
    this.limit = 1;
  }

  public get limitNum(): number {
    return this.limit;
  }

  public updateLimit(value: number): void {
    this.limit = value;
    this.page = 1;
    this.drawPagination();
    this.filterProducts();

    if (this.view.pagination) {
      this.view.pagination.addEventListener('click', (e) => this.handlePagination(e));
    }
  }

  protected filterProducts(): void {
    const firstProduct = this.limit * (this.page - 1);
    const lastProduct = this.limit * this.page;
    const productsToDraw = this.products.slice(firstProduct, lastProduct);
    this.cbDrawProducts(productsToDraw);
  }

  protected init(): void {
    if (this.products.length === 0) {
      deleteSearchParamFromUrl('page');
      this.cbDrawProducts(this.products);
    } else {
      const pageValue = getSearchParamValueFromUrl('page');
      this.page = pageValue ? +pageValue : 1;

      this.drawPagination();
      this.filterProducts();

      if (this.view.pagination) {
        this.view.pagination.addEventListener('click', (e) => this.handlePagination(e));
      }
    }
  }

  protected drawPagination(): void {
    this.pages = Math.ceil(this.products.length / this.limit);
    this.view.draw(this.pages, this.page);
  }

  protected handlePagination(e: Event): void {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const btnElem: HTMLElement | null = target.closest('.pagination__btn');
      if (btnElem && btnElem.dataset.page) {
        const elem = btnElem;
        if (elem.dataset.page) {
          this.page = +elem.dataset.page;
          this.filterProducts();
          this.view.updatePageButtons(this.page);
          this.view.updateArrows(this.pages, this.page);
          addSearchParamToUrl({ key: 'page', value: this.page.toString() });
        }
      }
    }
  }
}

export default PaginationController;
