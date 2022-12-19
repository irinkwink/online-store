import { IProductsData } from '../../types/interfaces';
import Overlay from './overlay/overlay';
import Products from './products/products';

export class AppView {
  products: Products;
  overlay: Overlay;

  constructor() {
    this.products = new Products();
    this.overlay = new Overlay();
  }

  drawProducts(data: IProductsData) {
    const values = data?.products ? data?.products : [];
    this.products.draw(values);

    const itemsCountElem = document.querySelector('.catalog__items-count');
    if (itemsCountElem) {
      itemsCountElem.textContent = values.length.toString();
    }

    const brands = values.map((item) => item.brand);

    const brandSelectElem = document.querySelector('#brand');
    const brandsItems = brands.map((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;

      return option;
    });

    brandSelectElem?.append(...brandsItems);
  }

  drawCategories(data: string[]) {
    const categorySelectElem = document.querySelector('#category');
    const categoryItems = data.map((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;

      return option;
    });

    categorySelectElem?.append(...categoryItems);
  }

  showFilters() {
    this.overlay.showOverlay();
    document.querySelector('.overlay')?.addEventListener('click', () => this.hideFilters());
    document.querySelector('.filter')?.classList.add('filter_show');
  }

  hideFilters() {
    this.overlay.hideOverlay();
    document.querySelector('.filter')?.classList.remove('filter_show');
  }

  checkDisplay(e: Event) {
    const target = e.target as Element;

    if (target.closest('.display__button') && !target.closest('.display__button_active')) {
      const btn = target.closest('.display__button') as HTMLButtonElement;
      document.querySelectorAll('.display__button').forEach((btn) => btn.classList.remove('display__button_active'));
      btn.classList.add('display__button_active');

      const productsListElem: HTMLElement | null = document.querySelector('.goods__list');
      if (productsListElem) {
        productsListElem.className = `goods__list goods__${btn.dataset.display}`;
      }
    }
  }
}

export default AppView;
