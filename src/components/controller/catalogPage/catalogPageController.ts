import { addSearchParamToUrl, getSearchParamValueFromUrl } from '../../router/urlController';
import CatalogPageView from '../../view/catalogPage/catalogPageView';
import PageController from '../pageController';
import TemplatePageController from '../templatePage/templatePageController';
import FilterController from './filterController';
import ProductsController from './productsController';

class CatalogPageController extends PageController {
  public view: CatalogPageView;
  private products: ProductsController;
  private filter: FilterController;
  private displayType: string;
  private isCatalogPage: boolean;

  public constructor(templatePage: TemplatePageController) {
    super(templatePage, 'catalog');
    this.view = new CatalogPageView();
    this.products = new ProductsController(
      this.state,
      (number) => this.view.updateCount(number),
      () => this.header.updateHeaderCartTotal()
    );
    this.filter = new FilterController((products) => this.products.init(products));
    this.displayType = 'tiles';
    this.isCatalogPage = false;
  }

  public start(): void {
    const pageValue = getSearchParamValueFromUrl('page');
    if (this.isCatalogPage && pageValue) {
      this.products.pagination.initPagination(this.filter.getProductsFilter);
    } else {
      super.start();
      this.view.wrapper = this.main.view.main;

      if (this.main.view.main) {
        this.view.draw();
        this.initDisplayType();
        this.initSortInput();

        this.products.view.wrapper = this.view.productsWrapper;
        this.products.pagination.view.wrapper = this.view.pagination;
        this.filter.view.wrapper = this.view.filter;
        this.filter.filterBtnElem = this.view.filterBtn;
        this.filter.searchFormElem = this.header.view.searchForm;
        this.filter.searchInputElem = this.header.view.searchInput;
        this.filter.sortSelectElem = this.view.sortSelect;

        this.filter.init(this.state.getState().products);

        this.isCatalogPage = true;
      }
    }
  }

  private initDisplayType(): void {
    const displatValue = getSearchParamValueFromUrl('display');
    if (displatValue && displatValue !== this.displayType) {
      this.displayType = displatValue;
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

  private initSortInput(): void {
    const sortValue = getSearchParamValueFromUrl('sort');
    if (sortValue && sortValue !== 'none') {
      this.view.updateSortInput(sortValue);
    }
  }
}

export default CatalogPageController;
