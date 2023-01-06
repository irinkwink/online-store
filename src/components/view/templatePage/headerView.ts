import logo from '../../../img/logo.svg';
import { CartTotal, HeaderCartInfo } from '../../../types/types';
import { HEADER_CART_INFO } from '../../app/const';

class HeaderView {
  private headerElem: HTMLElement | null;
  private totalNumberElem: HTMLSpanElement | null;
  private totalAmountElem: HTMLSpanElement | null;
  private searchFormElem: HTMLFormElement | null;
  private searchInputElem: HTMLInputElement | null;

  constructor() {
    this.headerElem = null;
    this.totalNumberElem = null;
    this.totalAmountElem = null;
    this.searchFormElem = null;
    this.searchInputElem = null;
  }

  public get header() {
    return this.headerElem;
  }

  public get searchForm() {
    return this.searchFormElem;
  }

  public get searchInput() {
    return this.searchInputElem;
  }

  public draw(cartTotal: CartTotal, page: string) {
    this.headerElem = document.createElement('header');
    this.headerElem.className = 'header';

    this.headerElem.append(this.createTitleElem());
    this.headerElem.append(this.createContainerElem(cartTotal, page));
  }

  public updateCartTotal(cartTotal: CartTotal) {
    if (this.totalNumberElem) this.totalNumberElem.textContent = cartTotal.productsNum.toString();
    if (this.totalAmountElem) this.totalAmountElem.textContent = `${cartTotal.totalAmount}$`;
  }

  updateSearchInput(value: string) {
    if (this.searchInputElem) {
      this.searchInputElem.value = value;
    }
  }

  private createTitleElem(): HTMLElement {
    const titleElem = document.createElement('h2');
    titleElem.className = 'visually-hidden';
    titleElem.textContent = 'OnLine Store - buy stuff online';

    return titleElem;
  }

  private createSearchElem(): HTMLFormElement {
    const formElem = document.createElement('form');
    formElem.className = 'header__search search';

    const labelElem = document.createElement('label');

    const inputElem = document.createElement('input');
    inputElem.className = 'search__input';
    inputElem.type = 'search';
    inputElem.name = 'search';

    const buttonElem = document.createElement('button');
    buttonElem.className = 'search__button';
    buttonElem.ariaLabel = 'search product';
    buttonElem.innerHTML = `
      <svg width="24" height="24" viewbox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.01809 3.01801C1.07184 4.96427 0 7.55192 0 10.3043C0 13.0567 1.07184 15.6443 3.01809 17.5905C4.9643 19.5367 7.55194 20.6086 10.3043 20.6086C12.8206 20.6086 15.199 19.7122 17.0757 18.0712L22.7984 23.7938C23.0733 24.0687 23.5189 24.0687 23.7938 23.7938C23.9312 23.6564 24 23.4763 24 23.2962C24 23.1161 23.9313 22.9359 23.7938 22.7985L18.0712 17.0758C19.7121 15.199 20.6086 12.8207 20.6086 10.3043C20.6086 7.55187 19.5367 4.96432 17.5905 3.01806C15.6443 1.07185 13.0567 1.43051e-06 10.3043 1.43051e-06C7.55194 1.43051e-06 4.9643 1.0718 3.01809 3.01801ZM16.5951 4.01345C20.0639 7.48226 20.0639 13.1263 16.5951 16.5951C13.1264 20.0638 7.48228 20.0638 4.01353 16.5951C2.27897 14.8605 1.41197 12.5828 1.41197 10.3042C1.41197 8.0263 2.27939 5.7476 4.01353 4.01341C7.48223 0.544736 13.1263 0.544736 16.5951 4.01345Z" />
      </svg>
    `;

    labelElem.append(inputElem);
    formElem.append(labelElem, buttonElem);

    this.searchInputElem = inputElem;

    return formElem;
  }

  private createContainerElem(cartTotal: CartTotal, page: string): HTMLElement {
    const containerElem = document.createElement('div');
    containerElem.className = 'container header__container';

    const logoLinkElem = document.createElement('a');
    logoLinkElem.className = 'header__logo-link';
    logoLinkElem.href = '/';

    const logoElem = new Image();
    logoElem.className = 'header__logo';
    logoElem.src = logo;
    logoElem.alt = 'logo Online Store';

    const cartElem = document.createElement('div');
    cartElem.className = 'header__cart header-cart';

    const cartTotalElem = document.createElement('div');
    cartTotalElem.className = 'header-cart__total';

    const headerCartRows: HeaderCartInfo[] = HEADER_CART_INFO;

    const numberIndex = headerCartRows.findIndex((item) => item.id === 'number');
    if (numberIndex !== -1) headerCartRows[numberIndex].total = cartTotal.productsNum;
    const amountIndex = headerCartRows.findIndex((item) => item.id === 'amount');
    if (numberIndex !== -1) headerCartRows[amountIndex].total = cartTotal.totalAmount;

    const cartRowElems = headerCartRows.map((item) => {
      const cartRowElem = document.createElement('p');
      cartRowElem.className = 'header-cart__row';

      const cartTextElem = document.createElement('span');
      cartTextElem.className = 'header-cart__text';
      cartTextElem.textContent = item.text;

      const cartTotalElem = document.createElement('span');
      cartTotalElem.className = `header-cart__text header-cart__text_bold header-cart__${item.id}`;
      cartTotalElem.textContent = `${item.total}${item.end}`;

      cartRowElem.append(cartTextElem, cartTotalElem);

      if (item.id === 'number') this.totalNumberElem = cartTotalElem;
      if (item.id === 'amount') this.totalAmountElem = cartTotalElem;

      return cartRowElem;
    });

    cartTotalElem.append(...cartRowElems);

    const cartLinkElem = document.createElement('a');
    cartLinkElem.className = 'header-cart__link';
    cartLinkElem.href = 'cart.html';
    cartLinkElem.ariaLabel = 'go to cart';
    cartLinkElem.innerHTML = `
      <svg width="32" height="32" viewbox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V25C3 25.5304 3.21071 26.0391 3.58579 26.4142C3.96086 26.7893 4.46957 27 5 27H27C27.5304 27 28.0391 26.7893 28.4142 26.4142C28.7893 26.0391 29 25.5304 29 25V7C29 6.46957 28.7893 5.96086 28.4142 5.58579C28.0391 5.21071 27.5304 5 27 5V5ZM16 20C14.4087 20 12.8826 19.3679 11.7574 18.2426C10.6321 17.1174 10 15.5913 10 14C10 13.7348 10.1054 13.4804 10.2929 13.2929C10.4804 13.1054 10.7348 13 11 13C11.2652 13 11.5196 13.1054 11.7071 13.2929C11.8946 13.4804 12 13.7348 12 14C12 15.0609 12.4214 16.0783 13.1716 16.8284C13.9217 17.5786 14.9391 18 16 18C17.0609 18 18.0783 17.5786 18.8284 16.8284C19.5786 16.0783 20 15.0609 20 14C20 13.7348 20.1054 13.4804 20.2929 13.2929C20.4804 13.1054 20.7348 13 21 13C21.2652 13 21.5196 13.1054 21.7071 13.2929C21.8946 13.4804 22 13.7348 22 14C22 15.5913 21.3679 17.1174 20.2426 18.2426C19.1174 19.3679 17.5913 20 16 20V20ZM5 9V7H27V9H5Z"/>
      </svg>
    `;

    logoLinkElem.append(logoElem);
    cartElem.append(cartTotalElem, cartLinkElem);

    containerElem.append(logoLinkElem);

    if (page === 'catalog') {
      containerElem.append(this.createSearchElem());
      containerElem.classList.add('header__container_catalog');
    }

    containerElem.append(cartElem);

    return containerElem;
  }
}

export default HeaderView;
