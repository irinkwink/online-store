import { IProductsData } from '../../types/interfaces';
import Products from './products/products';

export class AppView {
  products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: IProductsData) {
    const values = data?.products ? data?.products : [];
    this.products.draw(values);
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
