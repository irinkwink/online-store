import State from '../../app/state';
import { addSearchParamToUrl, getSearchParamsFromUrl } from '../../router/urlController';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import PageController from '../pageController';
import FilterController from './filterController';
import ProductsController from './productsController';

class CatalogPageController extends PageController {
  view: CatalogPageView;
  products: ProductsController;
  filter: FilterController;
  displayType: string;

  constructor(state: State) {
    super(state, 'catalog');
    this.view = new CatalogPageView();
    this.products = new ProductsController(
      state,
      (number) => this.view.updateCount(number),
      () => this.header.updateHeaderCartTotal()
    );
    this.filter = new FilterController((products) => this.products.init(products));
    this.displayType = 'tiles';
  }

  start() {
    super.start();
    this.view.wrapper = this.main.view.main;

    console.log('Catalog Page');
    if (this.main.view.main) {
      this.view.draw();
      this.initDisplayType();
      this.initSortInput();

      this.products.view.wrapper = this.view.productsWrapper;
      this.products.pagination.view.wrapper = this.view.pagination;
      this.filter.view.wrapper = this.view.filter;
      this.filter.filterBtn = this.view.filterBtn;
      this.filter.searchForm = this.header.view.searchForm;
      this.filter.searchInput = this.header.view.searchInput;
      this.filter.sortSelect = this.view.sortSelect;

      this.filter.init(this.state.getState().products);
    }
  }

  initDisplayType() {
    const searchParams = getSearchParamsFromUrl();
    const displayParam = searchParams.find((param) => param.key === 'display');
    if (displayParam && displayParam.value !== this.displayType) {
      this.displayType = displayParam.value;
      this.view.updateDisplayBtns(this.displayType);
      this.products.view.display = this.displayType;
    }

    this.view.displayBtns?.addEventListener('click', (e) => {
      const target = e.target as Element;

      if (target.closest('.display__button') && !target.closest('.display__button_active')) {
        const btn = target.closest('.display__button') as HTMLButtonElement;
        const displayType = btn.dataset.display;
        if (displayType) {
          this.displayType = displayType;
          this.view.updateDisplayBtns(this.displayType);
          this.products.view.updateProductsDisplay(this.displayType);
          addSearchParamToUrl({ key: 'display', value: this.displayType });
        }
      }
    });
  }

  initSortInput() {
    const searchParams = getSearchParamsFromUrl();
    const sortParam = searchParams.find((item) => item.key === 'sort');

    if (sortParam && sortParam?.value !== 'none') {
      this.view.updateSortInput(sortParam.value);
    }
  }
}

export default CatalogPageController;
