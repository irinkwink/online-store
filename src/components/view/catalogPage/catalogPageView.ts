import { IProduct } from '../../../types/interfaces';
import { addSearchParamsToUrl, getSearchParamsFromUrl } from '../../routes/urlController';
import Products from './products';

export class CatalogPageView {
  products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: IProduct[]) {
    const products = data ? data : [];
    this.products.draw(products);
    this.updateCount(products);
  }

  updateCount(products: IProduct[]) {
    const itemsCountElem = document.querySelector('.catalog__items-count');
    if (itemsCountElem) {
      itemsCountElem.textContent = products.length.toString();
    }
  }

  checkDisplay() {
    const searchParams = getSearchParamsFromUrl(['display']);
    const displayFromSearch = searchParams.filter((item) => item.param === 'display')[0];
    const display = displayFromSearch.value === null ? 'tiles' : displayFromSearch.value;
    const productsListElem: HTMLElement | null = document.querySelector('.goods__list');
    const displayButtonElems = document.querySelectorAll('.display__button');

    const changeDisplay = (display: string) => {
      displayButtonElems.forEach((btn) => {
        btn.classList.remove('display__button_active');
        if (display === (btn as HTMLButtonElement).dataset.display) {
          btn.classList.add('display__button_active');
        }
      });

      if (productsListElem) {
        productsListElem.className = `goods__list goods__${display}`;
      }
    };

    if (display !== 'tiles') {
      changeDisplay(display);
    }

    document.querySelector('.display')?.addEventListener('click', (e) => {
      const target = e.target as Element;

      if (target.closest('.display__button') && !target.closest('.display__button_active')) {
        const btn = target.closest('.display__button') as HTMLButtonElement;
        const display = btn.dataset.display;
        if (display) {
          changeDisplay(display);
          addSearchParamsToUrl([{ param: 'display', value: display }]);
        }
      }
    });
  }
}

export default CatalogPageView;
