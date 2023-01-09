import { DeviceWindowWidth } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import { WIDTH_THREE_ELEMS, WIDTH_TWO_ELEMS } from '../../app/const';
class ProductPageView {
  private wrapperElem: HTMLElement | null;
  private btnCartElem: HTMLButtonElement | null;
  private btnIncElem: HTMLButtonElement | null;
  private btnDecElem: HTMLButtonElement | null;
  private countNumberElem: HTMLOutputElement | null;
  private sliderElem: HTMLDivElement | null;
  private btnArrowPrev: HTMLButtonElement | null;
  private btnArrowNext: HTMLButtonElement | null;
  private thumbsElem: HTMLDivElement | null;
  private imageElem: HTMLImageElement | null;
  private controlElem: HTMLDivElement | null;

  public constructor() {
    this.wrapperElem = null;
    this.btnCartElem = null;
    this.btnDecElem = null;
    this.btnIncElem = null;
    this.countNumberElem = null;
    this.sliderElem = null;
    this.btnArrowPrev = null;
    this.btnArrowNext = null;
    this.thumbsElem = null;
    this.imageElem = null;
    this.controlElem = null;
  }

  public set wrapper(element: HTMLElement | null) {
    this.wrapperElem = element;
  }

  public get cardSliderElem(): HTMLDivElement | null {
    return this.sliderElem;
  }

  public get cardControlElem(): HTMLDivElement | null {
    return this.controlElem;
  }

  public draw(product: IProduct, numInCart: number): void {
    if (this.wrapperElem) {
      const cardElem = this.createCardArticleElem(product, numInCart);
      const containerElem = this.createContainerElem();
      containerElem.append(cardElem);
      this.wrapperElem.append(containerElem);

      this.updateArrowBtn('next', this.shouldInactivateNextArrow());
    }
  }

  private createContainerElem(): HTMLDivElement {
    const containerElem = document.createElement('div');
    containerElem.className = 'container';

    return containerElem;
  }

  private createImageItem(url: string): HTMLImageElement {
    const imageElem = new Image();
    imageElem.className = 'card__thumb';
    imageElem.src = url;

    return imageElem;
  }

  private createCardSliderElem(imageURLs: string[]): HTMLDivElement {
    const cardSliderElem = document.createElement('div');
    cardSliderElem.className = 'card__slider';

    const cardArrowPrevBtnElem = document.createElement('button');
    cardArrowPrevBtnElem.className = 'card__arrow arrow btn inactive';
    cardArrowPrevBtnElem.id = 'arrowRrev';
    cardArrowPrevBtnElem.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0918 3.49205L7.5958 9.00005L13.0918 14.508L11.3998 16.2L4.1998 9.00005L11.3998 1.80005L13.0918 3.49205Z"/>
        </svg>
      `;

    const cardArrowNextBtnElem = document.createElement('button');
    cardArrowNextBtnElem.className = 'card__arrow btn arrow';
    cardArrowNextBtnElem.id = 'arrowNext';
    cardArrowNextBtnElem.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.9082 3.49205L10.4042 9.00005L4.9082 14.508L6.6002 16.2L13.8002 9.00005L6.6002 1.80005L4.9082 3.49205Z"/>
        </svg>
      `;

    const cardThumbsContainerElem = document.createElement('div');
    cardThumbsContainerElem.className = 'card__thumbs-container';

    const cardThumbsElem = document.createElement('div');
    cardThumbsElem.className = 'card__thumbs';

    const thumbImages = imageURLs.map((url) => this.createImageItem(url));

    cardThumbsElem.append(...thumbImages);
    cardThumbsContainerElem.append(cardThumbsElem);
    cardSliderElem.append(cardArrowPrevBtnElem, cardThumbsContainerElem, cardArrowNextBtnElem);

    this.sliderElem = cardSliderElem;
    this.btnArrowPrev = cardArrowPrevBtnElem;
    this.btnArrowNext = cardArrowNextBtnElem;
    this.thumbsElem = cardThumbsElem;

    return cardSliderElem;
  }

  private createCardArticleElem(product: IProduct, numInCart: number): HTMLElement {
    const cardArticleElem = document.createElement('article');
    cardArticleElem.className = 'card';

    const cardBreadcrumbsElem = document.createElement('p');
    cardBreadcrumbsElem.className = 'card__breadcrumbs';
    const category = `${product.category[0].toUpperCase()}${product.category.slice(1)}`;
    cardBreadcrumbsElem.textContent = `Store > ${category} > ${product.brand} > ${product.title}`;

    const cardDetailsElem = document.createElement('div');
    cardDetailsElem.className = 'card__details';

    const cardGalleryElem = document.createElement('div');
    cardGalleryElem.className = 'card__gallery';

    const cardMainImageElem = document.createElement('div');
    cardMainImageElem.className = 'card__main-image';

    const cardDiscountElem = document.createElement('p');
    cardDiscountElem.className = 'card__discount';
    cardDiscountElem.textContent = `-${product.discountPercentage.toString()}%`;

    const cardImageElem = new Image();
    cardImageElem.className = 'card__image';
    cardImageElem.src = product.images[0];
    cardImageElem.alt = product.title;

    cardMainImageElem.append(cardImageElem, cardDiscountElem);
    cardGalleryElem.append(cardMainImageElem);

    if (product.images.length > 1) {
      cardGalleryElem.append(this.createCardSliderElem(product.images));
    }

    const cardInfoElem = document.createElement('div');
    cardInfoElem.className = 'card__info';

    const cardTitleElem = document.createElement('h2');
    cardTitleElem.className = 'card__title';
    cardTitleElem.textContent = product.title;

    const ratingElem = document.createElement('div');
    ratingElem.className = 'card__rating';
    const ratingActivWidth = Math.round((product.rating * 100) / 5);
    ratingElem.innerHTML = `
      <div class="card__stars stars">
        <div class="stars__row stars__row_inactive"></div>
        <div class="stars__row stars__row_active" style="width: ${ratingActivWidth.toString()}%"></div>
      </div>
      <p class="card__rate">${product.rating.toString()}</p>
    `;

    const cardDescriptionElem = document.createElement('p');
    cardDescriptionElem.className = 'card__description';
    cardDescriptionElem.textContent = product.description;

    const cardControlElem = document.createElement('div');
    cardControlElem.className = 'card__control';

    const cardCountElem = document.createElement('div');
    cardCountElem.className = 'card__count count';

    const cardBtnDecElem = document.createElement('button');
    cardBtnDecElem.className = `count__btn ${numInCart > 1 ? '' : 'inactive'}`;
    cardBtnDecElem.textContent = '–';
    cardBtnDecElem.id = 'cardBtnDec';

    const cardCountNumberElem = document.createElement('output');
    cardCountNumberElem.className = 'count__number';
    cardCountNumberElem.value = numInCart ? numInCart.toString() : '1';

    const cardBtnIncElem = document.createElement('button');
    cardBtnIncElem.className = 'count__btn';
    cardBtnIncElem.textContent = '+';
    cardBtnIncElem.id = 'cardBtnInc';

    const priceRowElem = document.createElement('div');
    priceRowElem.className = 'card__row card__row_price';

    const priceNewElem = document.createElement('p');
    priceNewElem.className = 'card__price card__price_new';
    priceNewElem.textContent = `${product.price.toString()}$`;

    const priceOldElem = document.createElement('p');
    priceOldElem.className = 'card__price card__price_old';
    const oldPrice = Math.round(product.price / (1 - product.discountPercentage / 100));
    priceOldElem.textContent = `${oldPrice.toString()}$`;

    const stockElem = document.createElement('p');
    stockElem.className = 'card__stock';
    stockElem.innerHTML = `
      <span class="card__stock-text">goods in stock:</span> 
      <span class="card__stock-count">${product.stock.toString()}</span>
    `;

    const toCartBtnElem = document.createElement('button');
    toCartBtnElem.className = 'btn card__button card__button_to-cart';
    toCartBtnElem.textContent = numInCart ? 'Add to Cart' : 'Remove from Cart';
    toCartBtnElem.dataset.idGoods = product.id.toString();
    toCartBtnElem.id = 'cardBtnToCart';

    const oneClickLinkElem = document.createElement('a');
    oneClickLinkElem.className = 'card__link';
    oneClickLinkElem.href = `cart.html?buyId=${product.id.toString()}`;

    const oneClickBtnElem = document.createElement('a');
    oneClickBtnElem.className = 'card__link card__button';
    oneClickBtnElem.textContent = 'Buy in One Click';
    oneClickBtnElem.type = 'button';
    oneClickBtnElem.dataset.idGoods = product.id.toString();
    oneClickBtnElem.id = 'cardBtnOneClick';
    oneClickBtnElem.href = `cart.html?buyId=${product.id.toString()}`;

    cardCountElem.append(cardBtnDecElem, cardCountNumberElem, cardBtnIncElem);
    priceRowElem.append(priceNewElem, priceOldElem);

    oneClickLinkElem.append(oneClickBtnElem);
    cardControlElem.append(cardCountElem, priceRowElem, stockElem, toCartBtnElem, oneClickBtnElem);

    cardInfoElem.append(cardTitleElem, ratingElem, cardDescriptionElem, cardControlElem);

    cardDetailsElem.append(cardGalleryElem, cardInfoElem);
    cardArticleElem.append(cardBreadcrumbsElem, cardDetailsElem);

    this.imageElem = cardImageElem;
    this.btnDecElem = cardBtnDecElem;
    this.btnIncElem = cardBtnIncElem;
    this.countNumberElem = cardCountNumberElem;
    this.btnCartElem = toCartBtnElem;
    this.controlElem = cardControlElem;

    return cardArticleElem;
  }

  public updateImage(url: string): void {
    if (this.imageElem) {
      this.imageElem.src = url;
    }
  }

  public scrollSlider(position: number): boolean {
    if (this.thumbsElem) {
      this.thumbsElem.style.left = `${position}px`;

      this.updateArrowBtn('prev', position === 0);
      this.updateArrowBtn('next', this.shouldInactivateNextArrow(position));
    }
    return false;
  }

  private shouldInactivateNextArrow(position = 0): boolean {
    if (this.thumbsElem) {
      const width = this.thumbsElem.offsetWidth + position;
      if (window.innerWidth <= DeviceWindowWidth.mobile || window.innerWidth > DeviceWindowWidth.tablet) {
        return width <= WIDTH_THREE_ELEMS;
      } else {
        return width <= WIDTH_TWO_ELEMS;
      }
    }
    return false;
  }

  private updateArrowBtn(arrow: string, shouldInactivate = false): void {
    switch (arrow) {
      case 'prev':
        if (shouldInactivate) {
          this.btnArrowPrev?.classList.add('inactive');
        } else {
          this.btnArrowPrev?.classList.remove('inactive');
        }
        break;
      case 'next':
        if (shouldInactivate) {
          this.btnArrowNext?.classList.add('inactive');
        } else {
          this.btnArrowNext?.classList.remove('inactive');
        }
        break;
    }
  }

  public updateCountNumber(count: number, isMax = false): void {
    if (this.countNumberElem) {
      this.countNumberElem.value = count.toString();
    }

    if (count === 1) {
      this.btnDecElem?.classList.add('inactive');
    } else {
      this.btnDecElem?.classList.remove('inactive');
    }

    if (isMax) {
      this.btnIncElem?.classList.add('inactive');
    } else {
      this.btnIncElem?.classList.remove('inactive');
    }
  }

  public updateBtnToCart(): void {
    if (this.btnCartElem) {
      this.btnCartElem.textContent =
        this.btnCartElem.textContent === 'Add to Cart' ? 'Remove from Cart' : 'Add to Cart';
    }
  }
}

export default ProductPageView;
