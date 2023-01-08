import { IProductLS } from '../../../types/interfaces';
import { CartTotal } from '../../../types/types';
// import { myPromoCode } from '../localStorage/PromoCodes';

export class CartPageView {
  private wrapperElem: HTMLElement | null;
  private paginationElem: HTMLDivElement | null;
  private limitInputElem: HTMLInputElement | null;
  private cartListElem: HTMLUListElement | null;
  private numberTotalElem: HTMLSpanElement | null;
  private priceTotalElem: HTMLSpanElement | null;
  private discountElem: HTMLParagraphElement | null;
  private promoInput: HTMLInputElement | null;
  private promoBlockElem: HTMLDivElement | null;

  constructor() {
    this.wrapperElem = null;
    this.paginationElem = null;
    this.limitInputElem = null;
    this.cartListElem = null;
    this.numberTotalElem = null;
    this.priceTotalElem = null;
    this.discountElem = null;
    this.promoInput = null;
    this.promoBlockElem = null;
  }

  public set wrapper(element: HTMLElement | null) {
    this.wrapperElem = element;
  }

  public get cartList() {
    return this.cartListElem;
  }

  public get pagination() {
    return this.paginationElem;
  }

  public get limitInput() {
    return this.limitInputElem;
  }

  public draw() {
    if (this.wrapperElem) {
      this.wrapperElem.append(this.createCartElem());
    }
  }

  private createCartElem(): HTMLElement {
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

    const totalElem = this.drawTotalElem();

    limitElem.append(limitLabelElem, limitInputElem);
    panelElem.append(titleElem, paginationElem, limitElem);
    sectionElem.append(panelElem, listElem);
    containerElem.append(sectionElem, totalElem);

    this.cartListElem = listElem;
    this.paginationElem = paginationElem;
    this.limitInputElem = limitInputElem;
    return containerElem;
  }

  private createProductElem(product: IProductLS) {
    const liElem = document.createElement('li');
    liElem.className = 'item';

    const linkImageElem = document.createElement('a');
    linkImageElem.className = 'item__link item__link_image';
    linkImageElem.href = `product.html?id=${product.id.toString()}`;

    const imageElem = new Image();
    imageElem.className = 'item__image';
    imageElem.src = product.thumbnail;
    imageElem.alt = product.title;

    const linkTitleElem = document.createElement('a');
    linkTitleElem.className = 'item__link item__link_title';
    linkTitleElem.href = `product.html?id=${product.id.toString()}`;

    const titleElem = document.createElement('h3');
    titleElem.className = 'item__title';
    titleElem.innerHTML = `${product.title}`;

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
    // btnDecElem.id = 'cardBtnDec';
    btnDecElem.id = 'btn-minus';

    if (product.num === 1) btnDecElem.classList.add('inactive');

    const countNumberElem = document.createElement('output');
    countNumberElem.className = 'count__number';
    countNumberElem.value = product.num.toString();

    const btnIncElem = document.createElement('button');
    btnIncElem.className = 'count__btn count__btn_inc control-btn';
    btnIncElem.textContent = '+';
    // btnIncElem.id = 'cardBtnInc';
    btnIncElem.id = 'btn-plus';

    const productsNum = document.createElement('span');
    productsNum.className = 'cart-table-row__num';

    const productDelBtn = document.createElement('button');
    productDelBtn.className = 'item__remove-cart control-btn';
    productDelBtn.id = 'btn-delete';
    productsNum.textContent = String(product.num);

    productDelBtn.innerHTML = `
      <svg width="32" height="32" viewbox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.3337 8.54667L23.4537 6.66667L16.0003 14.12L8.54699 6.66667L6.66699 8.54667L14.1203 16L6.66699 23.4533L8.54699 25.3333L16.0003 17.88L23.4537 25.3333L25.3337 23.4533L17.8803 16L25.3337 8.54667Z" />
      </svg>
    `;

    linkImageElem.append(imageElem);
    linkTitleElem.append(titleElem);
    countElem.append(btnDecElem, countNumberElem, btnIncElem);
    controlElem.append(countElem, productDelBtn);
    liElem.append(linkImageElem, linkTitleElem, descriptionElem, priceElem, controlElem);

    return liElem;
  }

  public drawProducts(productsInCart: IProductLS[]) {
    console.log('вывод');
    if (this.cartListElem) {
      if (productsInCart.length > 0) {
        this.cartListElem.innerHTML = '';
        const liElems = productsInCart.map((product) => this.createProductElem(product));
        this.cartListElem.append(...liElems);
      } else {
        const emptyMessageElem = document.createElement('p');
        emptyMessageElem.className = 'cart__empty';
        emptyMessageElem.textContent = 'Please, go shopping!';
        this.cartListElem.append(emptyMessageElem);
      }
    }
  }

  drawTotalElem() {
    const totalElem = document.createElement('section');
    totalElem.className = 'cart__total total';

    const wrapperElem = document.createElement('div');
    wrapperElem.className = 'total__wrapper';

    const titleElem = document.createElement('div');
    titleElem.className = 'total__title';
    titleElem.textContent = 'Summary';

    const tableElem = document.createElement('div');
    tableElem.className = 'total__table';

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

    const discountRowElem = document.createElement('p');
    discountRowElem.className = 'total__row total__row_discount total__discount';

    const promoElem = document.createElement('div');
    promoElem.className = 'promo-block';

    numberRowElem.append(numberTextElem, numberTotalElem);
    priceRowElem.append(priceTextElem, priceTotalElem);
    tableElem.append(numberRowElem, priceRowElem, discountRowElem);
    wrapperElem.append(titleElem, tableElem, promoElem);
    totalElem.append(wrapperElem);

    this.discountElem = discountRowElem;
    this.promoBlockElem = promoElem;
    this.numberTotalElem = numberTotalElem;
    this.priceTotalElem = priceTotalElem;

    return totalElem;
  }

  drawPromoBlock(settings: string[]) {
    if (this.promoBlockElem) {
      this.promoBlockElem.innerHTML = '';

      const promoInput = document.createElement('input');
      promoInput.type = 'text';
      promoInput.className = 'promo-block__input';
      promoInput.placeholder = 'Enter promo code';

      const codeInfo = document.createElement('p');
      codeInfo.textContent = "Promo for test: 'RSS', 'EPAM'";

      if (settings.length > 0) {
        const appliedTitle = document.createElement('h4');
        appliedTitle.className = 'promo-block__title';

        const promoContainer = document.createElement('div');
        promoContainer.className = 'promo-block__container';
        appliedTitle.textContent = 'Applied codes';

        promoContainer.append(appliedTitle);

        settings.forEach((setItem) => {
          const row = document.createElement('div');
          row.className = 'promo-block__row';

          const promoApplied = document.createElement('span');
          promoApplied.innerHTML = `${setItem} - 10 %`;

          const delCodeBtn = document.createElement('button');
          delCodeBtn.id = 'delete-code';
          delCodeBtn.className = 'btn promo-block_btn';
          delCodeBtn.textContent = 'Drop';
          row.append(promoApplied, delCodeBtn);
          promoContainer.insertAdjacentElement('beforeend', row);
        });

        this.promoBlockElem.append(promoContainer, promoInput, codeInfo);
      } else {
        this.promoBlockElem.append(promoInput, codeInfo);
      }
    }
  }

  drawPromoApplied(isValid: boolean, code: string) {
    if (isValid && this.promoBlockElem) {
      const row = document.createElement('div');
      row.className = 'promo-block__row';
      row.dataset.code = code;
      const addBtn = document.createElement('button');
      addBtn.id = 'add-code';
      addBtn.className = 'btn';
      const codeInfo = document.createElement('span');
      codeInfo.textContent = `${code} code - 10%`;
      addBtn.textContent = 'Add';
      row.append(codeInfo, addBtn);
      this.promoBlockElem.append(row);
    }
  }

  public updateLimit(limit: number) {
    if (this.limitInputElem) {
      this.limitInputElem.max = limit.toString();
      this.limitInputElem.value = limit.toString();
    }
  }

  public updateMaxLimit(limit: number) {
    if (this.limitInputElem) {
      this.limitInputElem.max = limit.toString();
    }
  }

  public updateTotal(cartTotal: CartTotal) {
    if (this.numberTotalElem) {
      this.numberTotalElem.textContent = cartTotal.productsNum.toString();
    }
    if (this.priceTotalElem) {
      this.priceTotalElem.textContent = `${cartTotal.totalPrice}$`;
    }
  }

  public updateDiscountPrice(discountPrice: number) {
    if (this.discountElem) {
      const discountTextElem = document.createElement('span');
      discountTextElem.className = 'total__text';
      discountTextElem.textContent = 'Discount price: ';

      const discountNumberElem = document.createElement('span');
      discountNumberElem.className = 'total__text total__text_discount total-num';
      discountNumberElem.textContent = `${discountPrice}$`;

      this.discountElem.append(discountTextElem, discountNumberElem);
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
  updateTotalPrice(totalSum: number) {
    const totalPrice = document.querySelector('.total__price');
    if (totalPrice) {
      totalPrice.textContent = totalSum.toString() + ' $';
    }
  }
  updateDiscountPrice(discount: number, summ: number) {
    const discountTotalPrice: HTMLElement | null = document.querySelector('.total__discount');
    const totalSummary: HTMLElement | null = document.querySelector('.total__header');
    if (discountTotalPrice && totalSummary && discount > 0) {
      const res = Math.floor(summ * (1 - discount));
      discountTotalPrice.innerHTML = `Discount price - ${res} $`;
      totalSummary.className = 'total__header line-through';
      console.log(summ * (1 - discount));
    } else if (totalSummary && discountTotalPrice) {
      totalSummary.className = 'total__header';
      discountTotalPrice.innerHTML = '';
    }
  }
}

export default CartPageView;
