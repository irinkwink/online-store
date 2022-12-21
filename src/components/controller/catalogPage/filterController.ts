import { IProduct } from '../../../types/interfaces';
import { MinMax } from '../../../types/types';
import State from '../../app/state';
import { addSearchParamsToUrl } from '../../routes/urlController';
import FilterView from '../../view/catalogPage/filterView';

class Filter {
  view: FilterView;
  products: IProduct[];
  productsFilter: IProduct[];
  category: string;
  brand: string;
  price: MinMax;
  stock: MinMax;
  priceFilter: MinMax;
  stockFilter: MinMax;

  constructor() {
    this.view = new FilterView();
    this.products = [];
    this.productsFilter = [];
    this.category = 'all';
    this.brand = 'all';
    this.price = {
      min: 0,
      max: 10000,
    };
    this.stock = {
      min: 0,
      max: 100,
    };
    this.priceFilter = {
      min: 0,
      max: 10000,
    };
    this.stockFilter = {
      min: 0,
      max: 100,
    };
  }

  init(state: State, callback: (data: IProduct[]) => void) {
    this.products = [...state.getState().products];
    this.productsFilter = [...state.getState().products];

    this.updateCategories();
    this.updateBrands();
    this.updatePrice();
    this.updateStock();

    document.querySelector('.catalog__filter-btn')?.addEventListener('click', () => this.view.showFilters());
    document.querySelector('.filter__title')?.addEventListener('click', () => this.view.hideFilters());

    document.querySelector('#priceFromSlider')?.addEventListener('input', (e) => this.updatePriceFilter(e, 'min'));
    document.querySelector('#priceToSlider')?.addEventListener('input', (e) => this.updatePriceFilter(e, 'max'));
    document.querySelector('#stockFromSlider')?.addEventListener('input', (e) => this.updateStockFilter(e, 'min'));
    document.querySelector('#stockToSlider')?.addEventListener('input', (e) => this.updateStockFilter(e, 'max'));

    document.querySelector('#priceFromSlider')?.addEventListener('change', () => this.filterProducts(callback));
    document.querySelector('#priceToSlider')?.addEventListener('change', () => this.filterProducts(callback));
    document.querySelector('#stockFromSlider')?.addEventListener('change', () => this.filterProducts(callback));
    document.querySelector('#stockToSlider')?.addEventListener('change', () => this.filterProducts(callback));

    const filterFormElem = document.querySelector('.filter__form');

    if (filterFormElem) {
      filterFormElem.querySelector('#category')?.addEventListener('input', (e) => {
        console.log('e: ', e);
        const target = e.target as HTMLSelectElement;
        this.category = target.value;

        if (this.category !== 'all') {
          this.productsFilter = this.products.filter((item) => item.category === this.category);
        } else {
          this.productsFilter = [...this.products];
        }
        this.brand = 'all';
        this.updateBrands();
        this.filterProducts(callback);
      });

      filterFormElem.querySelector('#brand')?.addEventListener('input', (e) => {
        const target = e.target as HTMLSelectElement;
        this.brand = target.value;
        if (this.brand !== 'all') {
          this.productsFilter = this.products.filter((item) => item.brand === this.brand);
        } else {
          this.productsFilter = [...this.products];
        }
        this.filterProducts(callback);
      });

      filterFormElem.addEventListener('submit', (e) => this.submit(e));
    }
  }

  filterProducts(callback: (data: IProduct[]) => void) {
    let data = [...this.products];

    if (this.category !== 'all') {
      data = this.products.filter((item) => item.category === this.category);
    }

    if (this.brand !== 'all') {
      data = this.products.filter((item) => item.brand === this.brand);
    }

    this.updatePrice();
    this.updateStock();

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

    console.log('filteredData: ', data);

    addSearchParamsToUrl([
      { param: 'category', value: this.category },
      { param: 'brand', value: this.brand },
      { param: 'minPrice', value: this.priceFilter.min.toString() },
      { param: 'maxPrice', value: this.priceFilter.max.toString() },
      { param: 'minStock', value: this.stockFilter.min.toString() },
      { param: 'maxStock', value: this.stockFilter.max.toString() },
    ]);

    this.productsFilter = [...data];

    callback(data);
  }

  updateCategories() {
    const categories = new Set(this.products.map((item) => item.category));
    this.view.drawCategories(Array.from(categories), this.category);
  }

  updateBrands() {
    const brands = new Set(this.productsFilter.map((item) => item.brand));
    this.view.drawBrands(Array.from(brands), this.brand);
  }

  updatePrice() {
    const prices = this.productsFilter.map((item) => item.price).sort((a, b) => a - b);
    this.price.min = prices[0];
    this.price.max = prices[prices.length - 1];
    this.priceFilter.min = prices[0];
    this.priceFilter.max = prices[prices.length - 1];
    this.view.drawPrice(this.price);
  }

  updateStock() {
    const stocks = this.productsFilter.map((item) => item.stock).sort((a, b) => a - b);
    this.stock.min = stocks[0];
    this.stock.max = stocks[stocks.length - 1];
    this.stockFilter.min = stocks[0];
    this.stockFilter.max = stocks[stocks.length - 1];
    this.view.drawStock(this.stock);
  }

  updatePriceFilter(e: Event, option: string) {
    const target = e.target as HTMLInputElement;
    this.priceFilter[option as keyof MinMax] = +target.value;
    this.view.drawPriceValues(this.priceFilter);
  }

  updateStockFilter(e: Event, option: string) {
    const target = e.target as HTMLInputElement;
    this.stockFilter[option as keyof MinMax] = +target.value;
    this.view.drawStockValues(this.stockFilter);
  }

  submit(e: Event) {
    e.preventDefault();
    console.log(this);
  }
}

export default Filter;
