import { IProduct } from '../../../types/interfaces';
import { MinMax } from '../../../types/types';
import {
  addSearchParamToUrl,
  copyToClipboard,
  deleteSearchParamFromUrl,
  deleteSearchParamsFromUrl,
  getSearchParamsFromUrl,
} from '../../router/urlController';
import FilterView from '../../view/catalogPage/filterView';

class Filter {
  view: FilterView;
  sort: string;
  products: IProduct[];
  productsFilter: IProduct[];
  category: string;
  brand: string;
  price: MinMax;
  stock: MinMax;
  priceFilter: MinMax;
  stockFilter: MinMax;
  search: string;

  constructor() {
    this.view = new FilterView();
    this.sort = 'none';
    this.products = [];
    this.productsFilter = [];
    this.category = 'all';
    this.brand = 'all';
    this.search = '';
    this.price = {
      min: 0,
      max: 0,
    };
    this.stock = {
      min: 0,
      max: 0,
    };
    this.priceFilter = {
      min: -1,
      max: -1,
    };
    this.stockFilter = {
      min: -1,
      max: -1,
    };
  }

  updateFilters() {
    this.updateCategories();
    this.updateBrands();
    this.updatePrice();
    this.updateStock();
  }

  resetFilters() {
    this.productsFilter = [...this.products];
    this.category = 'all';
    this.brand = 'all';
    this.updateFilters();
  }

  checkUrlForFilters() {
    const searchParams = getSearchParamsFromUrl();

    const minPriceParam = searchParams.filter((item) => item.key === 'minPrice');
    this.priceFilter.min = minPriceParam.length !== 0 ? +minPriceParam[0].value : this.price.min;

    const maxPriceParam = searchParams.filter((item) => item.key === 'maxPrice');
    this.priceFilter.max = maxPriceParam.length !== 0 ? +maxPriceParam[0].value : this.price.max;

    const minStockParam = searchParams.filter((item) => item.key === 'minStock');
    this.stockFilter.min = minStockParam.length !== 0 ? +minStockParam[0].value : this.stock.min;

    const maxStockParam = searchParams.filter((item) => item.key === 'maxStock');
    this.stockFilter.max = maxStockParam.length !== 0 ? +maxStockParam[0].value : this.stock.max;

    const categoryParam = searchParams.filter((item) => item.key === 'category');
    if (categoryParam.length !== 0) {
      this.category = categoryParam[0].value;
      this.productsFilter = this.products.filter((item) => item.category === this.category);
    }

    const brandParam = searchParams.filter((item) => item.key === 'brand');
    if (brandParam.length !== 0) {
      this.brand = brandParam[0].value;
    }

    const searchParam = searchParams.filter((item) => item.key === 'search');
    if (searchParam.length !== 0) {
      this.search = searchParam[0].value;
      this.view.drawSearchInput(this.search);
    }

    const sortParam = searchParams.filter((item) => item.key === 'sort');
    this.sort = sortParam.length !== 0 ? sortParam[0].value : 'none';

    if (this.sort !== 'none') {
      this.view.drawSortInput(this.sort);
    }

    this.updateFilters();
  }

  init(products: IProduct[], cbProducts: (data: IProduct[]) => void) {
    this.products = products;
    this.productsFilter = [...this.products];

    this.updateFilters();

    this.checkUrlForFilters();

    this.filterProducts(cbProducts);

    document.querySelector('.header__search')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = document.querySelector('.search__input');
      if (searchInput instanceof HTMLInputElement) {
        const searchStr = searchInput.value;
        if (searchStr !== this.search) {
          this.search = searchStr;
          if (this.search) {
            addSearchParamToUrl({ key: 'search', value: this.search });
          } else {
            deleteSearchParamFromUrl('search');
          }
          this.filterProducts(cbProducts);
        }
      }
    });

    document.querySelector('.catalog__filter-btn')?.addEventListener('click', () => this.view.showFilters());
    document.querySelector('.filter__title')?.addEventListener('click', () => this.view.hideFilters());

    document.querySelector('.filter__copy')?.addEventListener('click', () => {
      copyToClipboard();
      this.view.showCopiedMessage();
    });

    document.querySelector('#sort')?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.sort = target.value;
      if (this.sort === 'none') {
        deleteSearchParamFromUrl('sort');
      } else {
        addSearchParamToUrl({ key: 'sort', value: this.sort });
      }
      this.filterProducts(cbProducts);
    });

    const filterFormElem = document.querySelector('.filter__form');

    if (filterFormElem) {
      filterFormElem.addEventListener('reset', () => {
        const params = ['category', 'brand', 'minPrice', 'maxPrice', 'minStock', 'maxStock'];
        deleteSearchParamsFromUrl(params);
        this.resetFilters();
        this.filterProducts(cbProducts);
      });

      filterFormElem.addEventListener('input', (e) => {
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

      filterFormElem.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        switch (target.id) {
          case 'category': {
            this.category = target.value;

            if (this.category === 'all') {
              deleteSearchParamFromUrl('category');
              this.productsFilter = [...this.products];
            } else {
              this.productsFilter = this.products.filter((item) => item.category === this.category);
              addSearchParamToUrl({ key: 'category', value: this.category });
            }
            this.brand = 'all';
            this.updateBrands();
            this.updatePrice();
            this.updateStock();
            this.filterProducts(cbProducts);
            break;
          }
          case 'brand': {
            this.brand = target.value;
            if (this.brand === 'all') {
              deleteSearchParamFromUrl('brand');
              this.productsFilter = [...this.products];
            } else {
              this.productsFilter = this.products.filter((item) => item.brand === this.brand);
              addSearchParamToUrl({ key: 'brand', value: this.brand });
            }
            this.updatePrice();
            this.updateStock();
            this.filterProducts(cbProducts);
            break;
          }
          case 'priceFromSlider':
            addSearchParamToUrl({ key: 'minPrice', value: this.priceFilter.min.toString() });
            this.filterProducts(cbProducts);
            break;
          case 'priceToSlider':
            addSearchParamToUrl({ key: 'maxPrice', value: this.priceFilter.max.toString() });
            this.filterProducts(cbProducts);
            break;
          case 'stockFromSlider':
            addSearchParamToUrl({ key: 'minStock', value: this.stockFilter.min.toString() });
            this.filterProducts(cbProducts);
            break;
          case 'stockToSlider':
            addSearchParamToUrl({ key: 'maxStock', value: this.stockFilter.max.toString() });
            this.filterProducts(cbProducts);
            break;
        }
      });
    }
  }

  filterProducts(cbProducts: (data: IProduct[]) => void) {
    let data = [...this.products];

    if (this.category !== 'all') {
      data = this.products.filter((item) => item.category === this.category);
    }

    if (this.brand !== 'all') {
      data = this.products.filter((item) => item.brand === this.brand);
    }

    data = data.filter((item) => {
      if (
        item.price >= this.priceFilter.min &&
        item.price <= this.priceFilter.max &&
        item.stock >= this.stockFilter.min &&
        item.stock <= this.stockFilter.max
      ) {
        return true;
      }
      return false;
    });

    if (this.search) {
      const searchFields = ['title', 'description', 'brand', 'category'];
      data = data.filter((item) =>
        searchFields
          .map((field) => {
            const str = item[field as keyof IProduct];
            if (typeof str === 'string') {
              return str.toLowerCase().includes(this.search.toLowerCase());
            }
            return false;
          })
          .includes(true)
      );
    }

    switch (this.sort) {
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

    console.log('filteredData: ', data);

    this.productsFilter = [...data];

    cbProducts(data);
  }

  updateCategories() {
    const categories = new Set(this.products.map((item) => item.category));
    this.view.drawCategories(Array.from(categories), this.category);
  }

  updateBrands() {
    deleteSearchParamFromUrl('brand');
    const brands = new Set(this.productsFilter.map((item) => item.brand));
    this.view.drawBrands(Array.from(brands), this.brand);
  }

  updatePrice() {
    const prices = this.productsFilter.map((item) => item.price).sort((a, b) => a - b);
    this.price.min = prices[0];
    this.price.max = prices[prices.length - 1];

    if (this.price.min === this.price.max) {
      this.price.min = this.price.min - 100 < 0 ? 0 : this.price.min - 100;
      this.price.max = this.price.max + 100;
    }

    this.priceFilter.min = this.price.min;
    this.priceFilter.max = this.price.max;
    deleteSearchParamFromUrl('minPrice');
    deleteSearchParamFromUrl('maxPrice');

    this.view.drawPrice(this.price, this.priceFilter);
    this.view.drawPriceValues(this.price, this.priceFilter);
  }

  updateStock() {
    const stocks = this.productsFilter.map((item) => item.stock).sort((a, b) => a - b);
    this.stock.min = stocks[0];
    this.stock.max = stocks[stocks.length - 1];

    if (this.stock.min === this.stock.max) {
      this.stock.min = this.stock.min - 50 < 0 ? 0 : this.stock.min - 50;
      this.stock.max = this.stock.max + 50;
    }

    this.stockFilter.min = this.stock.min;
    this.stockFilter.max = this.stock.max;
    deleteSearchParamFromUrl('minStock');
    deleteSearchParamFromUrl('maxStock');

    this.view.drawStock(this.stock, this.stockFilter);
    this.view.drawStockValues(this.stock, this.stockFilter);
  }

  updatePriceFilter(value: string, option: string) {
    let checkValue = +value;
    if (option === 'min') {
      if (checkValue >= this.priceFilter.max) {
        checkValue = this.priceFilter.max;
      }
    }
    if (option === 'max') {
      if (checkValue <= this.priceFilter.min) {
        checkValue = this.priceFilter.min;
      }
    }
    this.priceFilter[option as keyof MinMax] = checkValue;
    this.view.drawPriceValues(this.price, this.priceFilter);
  }

  updateStockFilter(value: string, option: string) {
    let checkValue = +value;
    if (option === 'min') {
      if (checkValue >= this.stockFilter.max) {
        checkValue = this.stockFilter.max;
      }
    }
    if (option === 'max') {
      if (checkValue <= this.stockFilter.min) {
        checkValue = this.stockFilter.min;
      }
    }
    this.stockFilter[option as keyof MinMax] = checkValue;
    this.view.drawStockValues(this.stock, this.stockFilter);
  }
}

export default Filter;
