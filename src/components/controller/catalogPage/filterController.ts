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

class FilterController {
  cbProductsInit: (data: IProduct[]) => void;
  view: FilterView;
  filterBtn: HTMLButtonElement | null;
  searchForm: HTMLFormElement | null;
  searchInput: HTMLInputElement | null;
  sortSelect: HTMLSelectElement | null;
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

  constructor(cbProductsInit: (products: IProduct[]) => void) {
    this.cbProductsInit = cbProductsInit;
    this.view = new FilterView();
    this.filterBtn = null;
    this.searchForm = null;
    this.searchInput = null;
    this.sortSelect = null;
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

    const minPriceParam = searchParams.find((item) => item.key === 'minPrice');
    this.priceFilter.min = minPriceParam ? +minPriceParam.value : this.price.min;

    const maxPriceParam = searchParams.find((item) => item.key === 'maxPrice');
    this.priceFilter.max = maxPriceParam ? +maxPriceParam.value : this.price.max;

    const minStockParam = searchParams.find((item) => item.key === 'minStock');
    this.stockFilter.min = minStockParam ? +minStockParam.value : this.stock.min;

    const maxStockParam = searchParams.find((item) => item.key === 'maxStock');
    this.stockFilter.max = maxStockParam ? +maxStockParam.value : this.stock.max;

    const categoryParam = searchParams.find((item) => item.key === 'category');
    if (categoryParam) {
      this.category = categoryParam.value;
      this.productsFilter = this.products.filter((item) => item.category === this.category);
    }

    const brandParam = searchParams.find((item) => item.key === 'brand');
    if (brandParam) {
      this.brand = brandParam.value;
    }

    const searchParam = searchParams.find((item) => item.key === 'search');
    if (searchParam) {
      this.search = searchParam.value;
    }

    const sortParam = searchParams.find((item) => item.key === 'sort');
    this.sort = sortParam ? sortParam.value : 'none';

    this.updateFilters();
  }

  init(products: IProduct[]) {
    this.products = products;
    this.productsFilter = [...this.products];

    this.view.draw();

    this.checkUrlForFilters();

    this.filterProducts();

    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.searchInput) {
        const searchStr = this.searchInput.value;
        if (searchStr !== this.search) {
          this.search = searchStr;
          if (this.search) {
            addSearchParamToUrl({ key: 'search', value: this.search });
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
      this.sort = target.value;
      if (this.sort === 'none') {
        deleteSearchParamFromUrl('sort');
      } else {
        addSearchParamToUrl({ key: 'sort', value: this.sort });
      }
      this.filterProducts();
    });

    if (this.view.form) {
      this.view.form.addEventListener('reset', () => {
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
            this.filterProducts();
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
            this.filterProducts();
            break;
          }
          case 'priceFromSlider':
            addSearchParamToUrl({ key: 'minPrice', value: this.priceFilter.min.toString() });
            this.filterProducts();
            break;
          case 'priceToSlider':
            addSearchParamToUrl({ key: 'maxPrice', value: this.priceFilter.max.toString() });
            this.filterProducts();
            break;
          case 'stockFromSlider':
            addSearchParamToUrl({ key: 'minStock', value: this.stockFilter.min.toString() });
            this.filterProducts();
            break;
          case 'stockToSlider':
            addSearchParamToUrl({ key: 'maxStock', value: this.stockFilter.max.toString() });
            this.filterProducts();
            break;
        }
      });
    }
  }

  filterProducts() {
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

    console.log('filtered products: ', data);

    this.productsFilter = [...data];

    this.cbProductsInit(data);
  }

  updateCategories() {
    const categories = new Set(this.products.map((item) => item.category));
    this.view.updateCategories(Array.from(categories), this.category);
  }

  updateBrands() {
    deleteSearchParamFromUrl('brand');
    const brands = new Set(this.productsFilter.map((item) => item.brand));
    this.view.updateBrands(Array.from(brands), this.brand);
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

    this.view.updatePrice(this.price, this.priceFilter);
    this.view.updatePriceValues(this.price, this.priceFilter);
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

    this.view.updateStock(this.stock, this.stockFilter);
    this.view.updateStockValues(this.stock, this.stockFilter);
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
    this.view.updatePriceValues(this.price, this.priceFilter);
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
    this.view.updateStockValues(this.stock, this.stockFilter);
  }
}

export default FilterController;
