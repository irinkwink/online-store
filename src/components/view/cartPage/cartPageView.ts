import { IProductLS } from '../../../types/interfaces';
import { CartTotal, PromoCodes } from '../../../types/types';
import { MESSAGES, PROMO_CODES } from '../../app/const';

export class CartPageView {
  private wrapperElem: HTMLElement | null;
  private paginationElem: HTMLDivElement | null;
  private limitInputElem: HTMLInputElement | null;
  private cartListElem: HTMLUListElement | null;
  private numberTotalElem: HTMLSpanElement | null;
  private priceTotalElem: HTMLSpanElement | null;
  private discountPriceElem: HTMLParagraphElement | null;
  private discountPriceTotalElem: HTMLSpanElement | null;
  private promoInputElem: HTMLInputElement | null;
  private promoBlockElem: HTMLDivElement | null;
  private appliedPromoCodesElem: HTMLDivElement | null;
  private toApplyPromoCodesElem: HTMLDivElement | null;
  private buyBtnElem: HTMLButtonElement | null;

  public constructor() {
    this.wrapperElem = null;
    this.paginationElem = null;
    this.limitInputElem = null;
    this.cartListElem = null;
    this.numberTotalElem = null;
    this.priceTotalElem = null;
    this.discountPriceElem = null;
    this.discountPriceTotalElem = null;
    this.promoInputElem = null;
    this.promoBlockElem = null;
    this.appliedPromoCodesElem = null;
    this.toApplyPromoCodesElem = null;
    this.buyBtnElem = null;
  }

  public set wrapper(element: HTMLElement | null) {
    this.wrapperElem = element;
  }

  public get cartList(): HTMLUListElement | null {
    return this.cartListElem;
  }

  public get pagination(): HTMLDivElement | null {
    return this.paginationElem;
  }

  public get limitInput(): HTMLInputElement | null {
    return this.limitInputElem;
  }

  public get promoInput(): HTMLInputElement | null {
    return this.promoInputElem;
  }

  public get promoBlock(): HTMLDivElement | null {
    return this.promoBlockElem;
  }

  public get buyBtn(): HTMLButtonElement | null {
    return this.buyBtnElem;
  }

  public draw(): void {
    if (this.wrapperElem) {
      this.wrapperElem.innerHTML = '';
      this.wrapperElem.append(this.createCartElem());
    }
  }

  private createCartElem(): HTMLDivElement {
    const containerElem = document.createElement('div');
    containerElem.className = 'container cart__container cart';

    const sectionElem = document.createElement('section');
    sectionElem.className = 'cart__wrapper';

    const panelElem = document.createElement('div');
    panelElem.className = 'cart__panel';

    const titleElem = document.createElement('h2');
    titleElem.className = 'cart__title';
    titleElem.textContent = 'Cart';

    const paginationElem = document.createElement('div');
    paginationElem.className = 'cart__pagination pagination';

    const limitElem = document.createElement('div');
    limitElem.className = 'cart__limit';

    const limitLabelElem = document.createElement('label');
    limitLabelElem.className = 'cart__limit-label';
    limitLabelElem.textContent = 'Products per Page: ';

    const limitInputElem = document.createElement('input');
    limitInputElem.className = 'cart__limit-input';
    limitInputElem.type = 'number';
    limitInputElem.value = '10';
    limitInputElem.max = '10';
    limitInputElem.min = '1';

    const listElem = document.createElement('ul');
    listElem.className = 'cart__list cart-table';

    const totalElem = this.createTotalElem();

    limitElem.append(limitLabelElem, limitInputElem);
    panelElem.append(titleElem, paginationElem, limitElem);
    sectionElem.append(panelElem, listElem);
    containerElem.append(sectionElem, totalElem);

    this.cartListElem = listElem;
    this.paginationElem = paginationElem;
    this.limitInputElem = limitInputElem;
    return containerElem;
  }

  private createProductElem(product: IProductLS): HTMLLIElement {
    const liElem = document.createElement('li');
    liElem.className = 'item';

    const numberElem = document.createElement('p');
    numberElem.className = 'item__number';
    numberElem.textContent = product.index.toString();

    const linkImageElem = document.createElement('a');
    linkImageElem.className = 'item__link item__link_image';
    linkImageElem.href = `/product/${product.id.toString()}`;

    const imageElem = new Image();
    imageElem.className = 'item__image';
    imageElem.src = product.thumbnail;
    imageElem.alt = product.title;

    const linkTitleElem = document.createElement('a');
    linkTitleElem.className = 'item__link item__link_title';
    linkTitleElem.href = `/product/${product.id.toString()}`;

    const titleWrapperElem = document.createElement('div');
    titleWrapperElem.className = 'item__title-wrapper';

    const titleElem = document.createElement('h3');
    titleElem.className = 'item__title';
    titleElem.innerHTML = `${product.title}`;

    const categoryElem = document.createElement('p');
    categoryElem.className = 'item__title-text';
    categoryElem.textContent = `Category: ${product.category}`;

    const brandElem = document.createElement('p');
    brandElem.className = 'item__title-text';
    brandElem.textContent = `Brand: ${product.brand}`;

    const infoElem = document.createElement('div');
    infoElem.className = 'item__info';

    const ratingElem = document.createElement('div');
    ratingElem.className = 'item__rating';
    const ratingActivWidth = Math.round((product.rating * 100) / 5);
    ratingElem.innerHTML = `
      <div class="item__stars stars">
        <div class="stars__row stars__row_inactive"></div>
        <div class="stars__row stars__row_active" style="width: ${ratingActivWidth.toString()}%"></div>
      </div>
      <p class="item__rate">${product.rating.toString()}</p>
    `;

    const stockElem = document.createElement('p');
    stockElem.className = 'item__stock';
    stockElem.innerHTML = `Goods in stock: ${product.stock.toString()}`;

    const descriptionElem = document.createElement('div');
    descriptionElem.className = 'item__description';
    descriptionElem.innerHTML = `${product.description}`;

    const priceElem = document.createElement('p');
    priceElem.className = 'item__price';
    priceElem.innerHTML = `${product.price}$`;

    const controlElem = document.createElement('div');
    controlElem.className = 'item__control';
    controlElem.dataset.productId = product.id.toString();
    controlElem.dataset.productNumber = product.num.toString();
    controlElem.dataset.productStock = product.stock.toString();

    const countElem = document.createElement('div');
    countElem.className = 'item__count count';

    const btnDecElem = document.createElement('button');
    btnDecElem.className = 'count__btn count__btn_dec control-btn';
    btnDecElem.textContent = '–';
    btnDecElem.id = 'btn-minus';

    if (product.num === 1) btnDecElem.classList.add('inactive');

    const countNumberElem = document.createElement('output');
    countNumberElem.className = 'count__number';
    countNumberElem.value = product.num.toString();

    const btnIncElem = document.createElement('button');
    btnIncElem.className = 'count__btn count__btn_inc control-btn';
    btnIncElem.textContent = '+';
    btnIncElem.id = 'btn-plus';

    const productsNum = document.createElement('span');
    productsNum.className = 'cart-table-row__num';

    const productDelBtn = document.createElement('button');
    productDelBtn.className = 'item__remove-cart control-btn';
    productDelBtn.id = 'btn-delete';

    productDelBtn.innerHTML = `
      <svg width="32" height="32" viewbox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.3337 8.54667L23.4537 6.66667L16.0003 14.12L8.54699 6.66667L6.66699 8.54667L14.1203 16L6.66699 23.4533L8.54699 25.3333L16.0003 17.88L23.4537 25.3333L25.3337 23.4533L17.8803 16L25.3337 8.54667Z" />
      </svg>
    `;

    linkImageElem.append(imageElem);
    infoElem.append(ratingElem, stockElem);
    linkTitleElem.append(titleElem);
    titleWrapperElem.append(linkTitleElem, categoryElem, brandElem);
    countElem.append(btnDecElem, countNumberElem, btnIncElem);
    controlElem.append(countElem, productDelBtn);
    liElem.append(numberElem, linkImageElem, titleWrapperElem, infoElem, descriptionElem, priceElem, controlElem);

    return liElem;
  }

  public drawProducts(productsInCart: IProductLS[]): void {
    if (this.cartListElem) {
      this.cartListElem.innerHTML = '';
      if (productsInCart.length > 0) {
        const liElems = productsInCart.map((product) => this.createProductElem(product));
        this.cartListElem.append(...liElems);
      } else {
        this.cartListElem.append(this.drawCartEmptyMessage());
      }
    }
  }

  private drawCartEmptyMessage(): HTMLDivElement {
    const messageElem = document.createElement('div');
    messageElem.className = 'message';

    const textElems = MESSAGES.emptyCart.map((text) => {
      const textElem = document.createElement('p');
      textElem.className = 'message__text';
      textElem.textContent = text;
      return textElem;
    });

    messageElem.append(...textElems);

    return messageElem;
  }

  private createTotalElem(): HTMLElement {
    const totalElem = document.createElement('section');
    totalElem.className = 'cart__total total';

    const wrapperElem = document.createElement('div');
    wrapperElem.className = 'total__wrapper';

    const titleElem = document.createElement('div');
    titleElem.className = 'total__title total__section';
    titleElem.textContent = 'Summary';

    const tableElem = document.createElement('div');
    tableElem.className = 'total__table total__section';

    const numberRowElem = document.createElement('p');
    numberRowElem.className = 'total__row';

    const numberTextElem = document.createElement('span');
    numberTextElem.className = 'total__text';
    numberTextElem.textContent = 'Items: ';

    const numberTotalElem = document.createElement('span');
    numberTotalElem.className = 'total__text total__text_number total-num';

    const priceRowElem = document.createElement('p');
    priceRowElem.className = 'total__row';

    const priceTextElem = document.createElement('span');
    priceTextElem.className = 'total__text total-price';
    priceTextElem.textContent = 'Total price:';

    const priceTotalElem = document.createElement('span');
    priceTotalElem.className = 'total__text total__text_price total__price';

    const discountPriceRowElem = document.createElement('p');
    discountPriceRowElem.className = 'total__row total__row_discount total__discount total__row_hide';

    const discountPriceTextElem = document.createElement('span');
    discountPriceTextElem.className = 'total__text total__text_discount';
    discountPriceTextElem.textContent = 'Discount price:';

    const discountPriceTotalElem = document.createElement('span');
    discountPriceTotalElem.className = 'total__text total__text_discount';

    const promoElem = document.createElement('div');
    promoElem.className = 'total__promo promo total__section';

    const buyBtnElem = document.createElement('button');
    buyBtnElem.className = 'btn total__buy';
    buyBtnElem.textContent = 'Buy Now';

    numberRowElem.append(numberTextElem, numberTotalElem);
    priceRowElem.append(priceTextElem, priceTotalElem);
    discountPriceRowElem.append(discountPriceTextElem, discountPriceTotalElem);
    tableElem.append(numberRowElem, priceRowElem, discountPriceRowElem);
    wrapperElem.append(titleElem, tableElem, promoElem, buyBtnElem);
    totalElem.append(wrapperElem);

    this.discountPriceTotalElem = discountPriceTotalElem;
    this.discountPriceElem = discountPriceRowElem;
    this.promoBlockElem = promoElem;
    this.numberTotalElem = numberTotalElem;
    this.priceTotalElem = priceTotalElem;
    this.buyBtnElem = buyBtnElem;

    return totalElem;
  }

  public drawPromoElem(): void {
    if (this.promoBlockElem) {
      this.promoBlockElem.innerHTML = '';

      const appliedPromoCodesElem = document.createElement('div');
      appliedPromoCodesElem.className = 'promo__codes promo__codes_drop';

      const promoInputElem = document.createElement('input');
      promoInputElem.type = 'text';
      promoInputElem.className = 'promo__input';
      promoInputElem.placeholder = 'Enter promo code';

      const codeInfoElem = document.createElement('p');
      codeInfoElem.className = 'promo__text';

      const promoCodesString = Object.keys(PROMO_CODES)
        .map((code) => `'${code}'`)
        .join(', ');
      codeInfoElem.innerHTML = `
        <span>Promo codes for test: </span>
        <span>${promoCodesString}</span>
      `;

      const toApplyPromoCodesElem = document.createElement('div');
      toApplyPromoCodesElem.className = 'promo__codes promo__codes_apply';

      this.promoBlockElem.append(appliedPromoCodesElem, promoInputElem, codeInfoElem, toApplyPromoCodesElem);
      this.promoBlockElem.append();

      this.promoInputElem = promoInputElem;
      this.appliedPromoCodesElem = appliedPromoCodesElem;
      this.toApplyPromoCodesElem = toApplyPromoCodesElem;
    }
  }

  public emptyPromoCodeInput(): void {
    if (this.promoInputElem) {
      this.promoInputElem.value = '';
    }
  }

  public updateAppliedPromoCodes(codes: string[]): void {
    if (this.appliedPromoCodesElem) {
      if (codes.length === 0) {
        this.appliedPromoCodesElem.innerHTML = '';
      } else {
        this.appliedPromoCodesElem.innerHTML = '';
        const appliedTitleElem = document.createElement('h4');
        appliedTitleElem.className = 'promo__title total__section';
        appliedTitleElem.textContent = 'Applied Codes';

        const appliedRowsElem = document.createElement('div');
        appliedRowsElem.className = 'promo__rows';

        const rowElems = codes.map((code) => this.createCodeRowElem(code, 'drop'));

        appliedRowsElem.append(...rowElems);
        this.appliedPromoCodesElem.append(appliedTitleElem, appliedRowsElem);
      }
    }
  }

  public drawPromoCodeUsedMessage(): void {
    if (this.toApplyPromoCodesElem) {
      this.toApplyPromoCodesElem.innerHTML = '';
      const usedTextElem = document.createElement('p');
      usedTextElem.className = 'promo__text promo__text_used';
      usedTextElem.textContent = 'This promo code has already been applied!';

      this.toApplyPromoCodesElem.append(usedTextElem);
    }
  }

  public updateToApplyPromoCodes(code = ''): void {
    if (this.toApplyPromoCodesElem) {
      this.toApplyPromoCodesElem.innerHTML = '';
      if (code) {
        const rowElem = this.createCodeRowElem(code, 'add');
        this.toApplyPromoCodesElem.append(rowElem);
      }
    }
  }

  private createCodeRowElem(code: string, action: string): HTMLDivElement {
    const rowElem = document.createElement('div');
    rowElem.className = `promo__row promo__row_${action}`;

    const codeInfoElem = document.createElement('p');
    codeInfoElem.className = 'promo__code';
    const discount: number = code in PROMO_CODES ? PROMO_CODES[code as keyof PromoCodes] : 0;
    codeInfoElem.innerHTML = `${code} -${discount} %`;

    const delCodeBtnElem = document.createElement('button');
    delCodeBtnElem.id = `${action}CodeBtn`;
    delCodeBtnElem.className = 'btn promo__btn';
    delCodeBtnElem.textContent = action;
    delCodeBtnElem.dataset.code = code;

    rowElem.append(codeInfoElem, delCodeBtnElem);

    return rowElem;
  }

  public updateLimitInput(limit: number): void {
    if (this.limitInputElem) {
      this.limitInputElem.max = limit.toString();
      this.limitInputElem.value = limit.toString();
    }
  }

  public updateMaxLimit(limit: number): void {
    if (this.limitInputElem) {
      this.limitInputElem.max = limit.toString();
      if (+this.limitInputElem.value > +this.limitInputElem.max) this.limitInputElem.value = limit.toString();
    }
  }

  public updateTotal(cartTotal: CartTotal): void {
    if (this.numberTotalElem) {
      this.numberTotalElem.textContent = cartTotal.productsNum.toString();
    }
    if (this.priceTotalElem) {
      this.priceTotalElem.textContent = `${cartTotal.totalPrice}$`;
    }
    if (cartTotal.totalPrice === 0) {
      this.buyBtnElem?.classList.add('total__buy_inactive');
      this.promoInputElem?.classList.add('promo__input_inactive');
    } else {
      this.buyBtnElem?.classList.remove('total__buy_inactive');
      this.promoInputElem?.classList.remove('promo__input_inactive');
    }
  }

  public updateControl(controlElem: HTMLElement, number: number, isMax = false): void {
    if (controlElem) {
      const numberElem: HTMLOutputElement | null = controlElem.querySelector('.count__number');
      const btnDecElem: HTMLButtonElement | null = controlElem.querySelector('.count__btn_dec');
      const btnIncElem: HTMLButtonElement | null = controlElem.querySelector('.count__btn_inc');
      controlElem.dataset.productNumber = number.toString();

      if (numberElem) {
        numberElem.value = number.toString();
      }

      if (btnDecElem) {
        if (number === 1) {
          btnDecElem?.classList.add('inactive');
        } else {
          btnDecElem?.classList.remove('inactive');
        }
      }

      if (btnIncElem) {
        if (isMax) {
          btnIncElem?.classList.add('inactive');
        } else {
          btnIncElem?.classList.remove('inactive');
        }
      }
    }
  }

  public updateDiscountPrice(discountPrice: number, isHideDiscount: boolean): void {
    if (this.discountPriceElem && this.discountPriceTotalElem) {
      if (discountPrice > 0 && !isHideDiscount) {
        this.discountPriceTotalElem.textContent = `${discountPrice}$`;
        this.discountPriceElem.classList.remove('total__row_hide');
        this.priceTotalElem?.classList.add('total__text_line');
      } else {
        this.discountPriceElem.classList.add('total__row_hide');
        this.priceTotalElem?.classList.remove('total__text_line');
      }
    }
  }
}

export default CartPageView;
