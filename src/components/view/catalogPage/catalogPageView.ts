import { IProduct } from '../../../types/interfaces';
import { addSearchParamToUrl, getSearchParamsFromUrl } from '../../routes/urlController';
import Products from './products';

class CatalogPageView {
  products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(products: IProduct[]) {
    const messageElem = document.querySelector('.goods__empty');
    if (messageElem) {
      messageElem.remove();
    }
    this.products.draw(products);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  drawProductsEmptyMessage() {
    const productsListElem: HTMLElement | null = document.querySelector('.goods__list');

    if (productsListElem) {
      productsListElem.innerHTML = '';

      const messageElem = document.querySelector('.goods__empty');
      if (!messageElem) {
        const messageElem = document.createElement('p');
        messageElem.className = 'goods__empty';
        messageElem.textContent = `Sorry, we couldn't find products with these parameters. Try to set less restrictive filters or to change your search request.`;

        productsListElem.insertAdjacentElement('beforebegin', messageElem);
      }
    }
  }

  updateCount(count: number) {
    const itemsCountElem = document.querySelector('.catalog__items-count');
    if (itemsCountElem) {
      itemsCountElem.textContent = count.toString();
    }
  }

  checkDisplay() {
    const searchParams = getSearchParamsFromUrl();
    const displayParam = searchParams.filter((item) => item.key === 'display');
    const display = displayParam.length === 0 ? 'tiles' : displayParam[0].value;
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
          addSearchParamToUrl({ key: 'display', value: display });
        }
      }
    });
  }
}

export default CatalogPageView;
