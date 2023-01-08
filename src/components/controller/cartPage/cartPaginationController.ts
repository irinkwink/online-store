import { IProductLS } from '../../../types/interfaces';
import { addSearchParamToUrl, deleteSearchParamFromUrl, getSearchParamValueFromUrl } from '../../router/urlController';
import PaginationView from '../../view/paginationView';

class CartPaginationController {
  public view: PaginationView;
  private products: IProductLS[];
  private cbDrawProducts: (data: IProductLS[]) => void;
  private pages: number;
  private page: number;
  private limit: number;

  constructor(callback: (data: IProductLS[]) => void) {
    this.view = new PaginationView();
    this.products = [];
    this.cbDrawProducts = callback;
    this.pages = 0;
    this.page = 1;
    this.limit = 1;
  }

  public get limitNum() {
    return this.limit;
  }

  public set limitNum(value: number) {
    this.limit = value;
  }

  public updateLimit(value: number) {
    this.limit = value;
    this.drawPagination();
    this.drawProducts();

    if (this.view.pagination) {
      this.view.pagination.addEventListener('click', (e) => this.handlePagination(e));
    }
  }

  private drawProducts() {
    const firstProduct = this.limit * (this.page - 1);
    const lastProduct = this.limit * this.page;
    const productsToDraw = this.products.slice(firstProduct, lastProduct);
    this.cbDrawProducts(productsToDraw);
  }

  public init(products: IProductLS[], isCartPage = false) {
    console.log('products: ', products.length);
    this.products = products;
    if (isCartPage) {
      deleteSearchParamFromUrl('page');
    } else {
      this.limit = this.products.length === 0 ? 1 : this.products.length;
    }

    if (this.products.length === 0) {
      deleteSearchParamFromUrl('page');
      this.cbDrawProducts(this.products);
    } else {
      const pageValue = getSearchParamValueFromUrl('page');
      this.page = pageValue ? +pageValue : 1;
      console.log('this.page: ', this.page);

      this.drawPagination();
      this.drawProducts();

      if (this.view.pagination) {
        this.view.pagination.addEventListener('click', (e) => this.handlePagination(e));
      }
    }
  }

  private drawPagination() {
    this.pages = Math.ceil(this.products.length / this.limit);
    if (this.pages > 1) {
      this.view.draw(this.pages, this.page);
    }
  }

  private handlePagination(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target) {
      const btnElem: HTMLElement | null = target.closest('.pagination__btn');
      if (btnElem && btnElem.dataset.page) {
        const elem = btnElem;
        if (elem.dataset.page) {
          this.page = +elem.dataset.page;
          this.drawProducts();
          this.view.updatePageButtons(this.page);
          this.view.updateArrows(this.pages, this.page);
          addSearchParamToUrl({ key: 'page', value: this.page.toString() });
        }
      }
    }
  }
}

export default CartPaginationController;
