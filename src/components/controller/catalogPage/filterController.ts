import { IProduct } from '../../../types/interfaces';
import { FiltersValues, MinMax } from '../../../types/types';
import { INITIAL_FILTERS } from '../../app/const';
import {
  addSearchParamToUrl,
  copyToClipboard,
  deleteSearchParamFromUrl,
  deleteSearchParamsFromUrl,
  getSearchParamsFromUrl,
} from '../../router/urlController';
import FilterView from '../../view/catalogPage/filterView';

class FilterController {
  cbProductsInit: (data: IProduct[]) => void;
  view: FilterView;
  filterBtn: HTMLButtonElement | null;
  searchForm: HTMLFormElement | null;
  searchInput: HTMLInputElement | null;
  sortSelect: HTMLSelectElement | null;
  products: IProduct[];
  productsFilter: IProduct[];
  filters: FiltersValues;

  constructor(cbProductsInit: (products: IProduct[]) => void) {
    this.cbProductsInit = cbProductsInit;
    this.view = new FilterView();
    this.filterBtn = null;
    this.searchForm = null;
    this.searchInput = null;
    this.sortSelect = null;
    this.products = [];
    this.productsFilter = [];
    this.filters = Object.assign({}, INITIAL_FILTERS);
  }

  init(products: IProduct[]) {
    this.products = products;
    this.productsFilter = [...this.products];

    this.view.draw();

    this.initFilters();
    this.checkUrlForFilters();

    this.filterProducts();

    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.searchInput) {
        const searchStr = this.searchInput.value.trim();
        if (searchStr !== this.filters.search) {
          this.filters.search = searchStr;
          if (this.filters.search) {
            addSearchParamToUrl({ key: 'search', value: this.filters.search });
          } else {
            deleteSearchParamFromUrl('search');
          }
          this.filterProducts();
        }
      }
    });

    this.filterBtn?.addEventListener('click', () => this.view.showFilters());
    this.view.title?.addEventListener('click', () => this.view.hideFilters());

    this.view.copyBtn?.addEventListener('click', () => {
      copyToClipboard();
      this.view.showCopiedMessage();
    });

    this.sortSelect?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.filters.sort = target.value;
      if (this.filters.sort === 'none') {
        deleteSearchParamFromUrl('sort');
      } else {
        addSearchParamToUrl({ key: 'sort', value: this.filters.sort });
      }
      this.filterProducts();
    });

    if (this.view.form) {
      this.view.form.addEventListener('reset', () => {
        console.log('this.view.form: ', this.view.form);

        debugger;
        const params = ['category', 'brand', 'minPrice', 'maxPrice', 'minStock', 'maxStock'];
        deleteSearchParamsFromUrl(params);
        this.resetFilters();
        this.filterProducts();
      });

      this.view.form.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        switch (target.id) {
          case 'priceFromSlider': {
            this.updatePriceFilter(target.value, 'min');
            break;
          }
          case 'priceToSlider': {
            this.updatePriceFilter(target.value, 'max');
            break;
          }
          case 'stockFromSlider': {
            this.updateStockFilter(target.value, 'min');
            break;
          }
          case 'stockToSlider': {
            this.updateStockFilter(target.value, 'max');
            break;
          }
        }
      });

      this.view.form.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        switch (target.id) {
          case 'category': {
            this.filters.category = target.value;

            if (this.filters.category === 'all') {
              deleteSearchParamFromUrl('category');
              this.productsFilter = [...this.products];
            } else {
              this.productsFilter = this.products.filter((item) => item.category === this.filters.category);
              addSearchParamToUrl({ key: 'category', value: this.filters.category });
            }
            this.filters.brand = 'all';
            const params = ['brand', 'minPrice', 'maxPrice', 'minStock', 'maxStock'];
            deleteSearchParamsFromUrl(params);
            this.updateBrands();
            this.updatePrice();
            this.updateStock();
            this.filterProducts();
            break;
          }
          case 'brand': {
            this.filters.brand = target.value;
            if (this.filters.brand === 'all') {
              deleteSearchParamFromUrl('brand');
              this.productsFilter = [...this.products];
            } else {
              this.productsFilter = this.products.filter((item) => item.brand === this.filters.brand);
              addSearchParamToUrl({ key: 'brand', value: this.filters.brand });
            }
            const params = ['minPrice', 'maxPrice', 'minStock', 'maxStock'];
            deleteSearchParamsFromUrl(params);
            this.updatePrice();
            this.updateStock();
            this.filterProducts();
            break;
          }
          case 'priceFromSlider':
            if (this.filters.priceFilter.min === this.filters.price.min) {
              deleteSearchParamFromUrl('minPrice');
            } else {
              addSearchParamToUrl({ key: 'minPrice', value: this.filters.priceFilter.min.toString() });
            }
            this.filterProducts();
            break;
          case 'priceToSlider':
            if (this.filters.priceFilter.max === this.filters.price.max) {
              deleteSearchParamFromUrl('maxPrice');
            } else {
              addSearchParamToUrl({ key: 'maxPrice', value: this.filters.priceFilter.max.toString() });
            }
            this.filterProducts();
            break;
          case 'stockFromSlider':
            if (this.filters.stockFilter.min === this.filters.stock.min) {
              deleteSearchParamFromUrl('minStock');
            } else {
              addSearchParamToUrl({ key: 'minStock', value: this.filters.stockFilter.min.toString() });
            }
            this.filterProducts();
            break;
          case 'stockToSlider':
            if (this.filters.stockFilter.max === this.filters.stock.max) {
              deleteSearchParamFromUrl('maxStock');
            } else {
              addSearchParamToUrl({ key: 'maxStock', value: this.filters.stockFilter.max.toString() });
            }
            this.filterProducts();
            break;
        }
      });
    }
  }

  resetFilters() {
    this.productsFilter = [...this.products];
    this.filters.category = 'all';
    this.filters.brand = 'all';
    this.updateCategories();
    this.updateBrands();
    this.updatePrice();
    this.updateStock();
  }

  initFilters() {
    this.filters = Object.assign({}, INITIAL_FILTERS);
  }

  checkUrlForFilters() {
    const searchParams = getSearchParamsFromUrl();

    const searchParam = searchParams.find((item) => item.key === 'search');
    this.filters.search = searchParam ? searchParam.value : '';

    const sortParam = searchParams.find((item) => item.key === 'sort');
    this.filters.sort = sortParam ? sortParam.value : 'none';

    const categoryParam = searchParams.find((item) => item.key === 'category');
    if (categoryParam) {
      this.filters.category = categoryParam.value;
      this.productsFilter = this.products.filter((item) => item.category === this.filters.category);
    }

    this.updateCategories();
    this.updateBrands();

    const brandParam = searchParams.find((item) => item.key === 'brand');
    if (brandParam) {
      this.filters.brand = brandParam.value;
      this.productsFilter = this.productsFilter.filter((item) => item.brand === this.filters.brand);
    }

    this.updatePrice();
    this.updateStock();

    const minPriceParam = searchParams.find((item) => item.key === 'minPrice');
    this.filters.priceFilter.min = minPriceParam ? +minPriceParam.value : this.filters.price.min;

    const maxPriceParam = searchParams.find((item) => item.key === 'maxPrice');
    this.filters.priceFilter.max = maxPriceParam ? +maxPriceParam.value : this.filters.price.max;

    const minStockParam = searchParams.find((item) => item.key === 'minStock');
    this.filters.stockFilter.min = minStockParam ? +minStockParam.value : this.filters.stock.min;

    const maxStockParam = searchParams.find((item) => item.key === 'maxStock');
    this.filters.stockFilter.max = maxStockParam ? +maxStockParam.value : this.filters.stock.max;

    this.updatePrice(false);
    this.updateStock(false);
  }

  filterProducts() {
    let data = [...this.products];

    if (this.filters.category !== 'all') {
      data = data.filter((item) => item.category === this.filters.category);
    }

    if (this.filters.brand !== 'all') {
      data = data.filter((item) => item.brand === this.filters.brand);
    }

    data = data.filter((item) => {
      if (
        item.price >= this.filters.priceFilter.min &&
        item.price <= this.filters.priceFilter.max &&
        item.stock >= this.filters.stockFilter.min &&
        item.stock <= this.filters.stockFilter.max
      ) {
        return true;
      }
      return false;
    });

    if (this.filters.search) {
      const searchFields = ['title', 'description', 'brand', 'category'];
      data = data.filter((item) =>
        searchFields
          .map((field) => {
            const str = item[field as keyof IProduct];
            if (typeof str === 'string') {
              return str.toLowerCase().includes(this.filters.search.toLowerCase());
            }
            return false;
          })
          .includes(true)
      );
    }

    switch (this.filters.sort) {
      case 'priceLowtoHigh':
        data = data.sort((a, b) => a.price - b.price);
        break;
      case 'priceHightoLow':
        data = data.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        data = data.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        data = data.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }

    this.productsFilter = [...data];

    this.cbProductsInit(data);
  }

  updateCategories() {
    const categories = new Set(this.products.map((item) => item.category));
    this.view.updateCategories(Array.from(categories), this.filters.category);
  }

  updateBrands() {
    const brands = new Set(this.productsFilter.map((item) => item.brand));
    this.view.updateBrands(Array.from(brands), this.filters.brand);
  }

  updatePrice(changeFiltersValues = true) {
    const prices = this.productsFilter.map((item) => item.price).sort((a, b) => a - b);
    this.filters.price.min = prices[0];
    this.filters.price.max = prices[prices.length - 1];

    if (this.filters.price.min === this.filters.price.max) {
      this.filters.price.min = this.filters.price.min - 100 < 0 ? 0 : this.filters.price.min - 100;
      this.filters.price.max = this.filters.price.max + 100;
    }

    if (changeFiltersValues) {
      this.filters.priceFilter.min = this.filters.price.min;
      this.filters.priceFilter.max = this.filters.price.max;
    }

    this.view.updatePrice(this.filters.price, this.filters.priceFilter);
    this.view.updatePriceValues(this.filters.price, this.filters.priceFilter);
  }

  updateStock(changeFilters = true) {
    const stocks = this.productsFilter.map((item) => item.stock).sort((a, b) => a - b);
    this.filters.stock.min = stocks[0];
    this.filters.stock.max = stocks[stocks.length - 1];

    if (this.filters.stock.min === this.filters.stock.max) {
      this.filters.stock.min = this.filters.stock.min - 50 < 0 ? 0 : this.filters.stock.min - 50;
      this.filters.stock.max = this.filters.stock.max + 50;
    }

    if (changeFilters) {
      this.filters.stockFilter.min = this.filters.stock.min;
      this.filters.stockFilter.max = this.filters.stock.max;
    }

    this.view.updateStock(this.filters.stock, this.filters.stockFilter);
    this.view.updateStockValues(this.filters.stock, this.filters.stockFilter);
  }

  updatePriceFilter(value: string, option: string) {
    let checkValue = +value;
    if (option === 'min') {
      if (checkValue >= this.filters.priceFilter.max) {
        checkValue = this.filters.priceFilter.max;
      }
    }
    if (option === 'max') {
      if (checkValue <= this.filters.priceFilter.min) {
        checkValue = this.filters.priceFilter.min;
      }
    }
    this.filters.priceFilter[option as keyof MinMax] = checkValue;
    this.view.updatePriceValues(this.filters.price, this.filters.priceFilter);
  }

  updateStockFilter(value: string, option: string) {
    let checkValue = +value;
    if (option === 'min') {
      if (checkValue >= this.filters.stockFilter.max) {
        checkValue = this.filters.stockFilter.max;
      }
    }
    if (option === 'max') {
      if (checkValue <= this.filters.stockFilter.min) {
        checkValue = this.filters.stockFilter.min;
      }
    }
    this.filters.stockFilter[option as keyof MinMax] = checkValue;
    this.view.updateStockValues(this.filters.stock, this.filters.stockFilter);
  }
}

export default FilterController;
