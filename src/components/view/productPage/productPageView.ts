import { IProduct } from '../../../types/interfaces';

class ProductPageView {
  private btnCartElem: HTMLButtonElement | null;
  private btnIncElem: HTMLButtonElement | null;
  private btnDecElem: HTMLButtonElement | null;
  private countNumberElem: HTMLOutputElement | null;
  private thumbsElem: HTMLDivElement | null;
  private imageElem: HTMLImageElement | null;
  private controlElem: HTMLDivElement | null;

  constructor() {
    this.btnCartElem = null;
    this.btnDecElem = null;
    this.btnIncElem = null;
    this.countNumberElem = null;
    this.thumbsElem = null;
    this.imageElem = null;
    this.controlElem = null;
  }

  public get cardThumbsElem(): HTMLDivElement | null {
    return this.thumbsElem;
  }

  public get cardControlElem(): HTMLDivElement | null {
    return this.controlElem;
  }

  public drawCard(product: IProduct, isInCart: boolean): void {
    const main = document.querySelector('main');

    if (main) {
      const cardElem = this.createCardArticleElement(product, isInCart);
      const containerElem = this.createContainerElem();
      containerElem.append(cardElem);
      main.append(containerElem);
    }
  }

  private createImageItem(url: string): HTMLImageElement {
    const imageElem = new Image();
    imageElem.className = 'card__thumb';
    imageElem.src = url;

    return imageElem;
  }

  private createContainerElem(): HTMLDivElement {
    const containerElem = document.createElement('div');
    containerElem.className = 'container';

    return containerElem;
  }

  private createCardArticleElement(product: IProduct, isInCart: boolean): HTMLElement {
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

    const cardThumbsElem = document.createElement('div');
    cardThumbsElem.className = 'card__thumbs';

    if (product.images.length > 1) {
      const thumbImages = product.images.map((url) => this.createImageItem(url));

      cardThumbsElem.append(...thumbImages);
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
    cardCountElem.className = 'card__count';

    const cardBtnDecElem = document.createElement('button');
    cardBtnDecElem.className = 'card__btn card__btn_dec inactive';
    cardBtnDecElem.textContent = '–';
    cardBtnDecElem.id = 'cardBtnDec';

    const cardCountNumberElem = document.createElement('output');
    cardCountNumberElem.className = 'card__number';
    cardCountNumberElem.textContent = '1';

    const cardBtnIncElem = document.createElement('button');
    cardBtnIncElem.className = 'card__btn card__btn_inc';
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
    toCartBtnElem.textContent = isInCart ? 'Remove from Cart' : 'Add to Cart';
    toCartBtnElem.dataset.idGoods = product.id.toString();
    toCartBtnElem.id = 'cardBtnToCart';

    const oneClickBtnElem = document.createElement('button');
    oneClickBtnElem.className = 'btn card__button card__button_one-click';
    oneClickBtnElem.textContent = 'Buy in One Click';
    oneClickBtnElem.dataset.idGoods = product.id.toString();
    oneClickBtnElem.id = 'cardBtnOneClick';

    cardMainImageElem.append(cardImageElem, cardDiscountElem);
    cardGalleryElem.append(cardMainImageElem, cardThumbsElem);

    cardCountElem.append(cardBtnDecElem, cardCountNumberElem, cardBtnIncElem);
    priceRowElem.append(priceNewElem, priceOldElem);

    cardControlElem.append(cardCountElem, priceRowElem, stockElem, toCartBtnElem, oneClickBtnElem);

    cardInfoElem.append(cardTitleElem, ratingElem, cardDescriptionElem, cardControlElem);

    cardDetailsElem.append(cardGalleryElem, cardInfoElem);
    cardArticleElem.append(cardBreadcrumbsElem, cardDetailsElem);

    this.imageElem = cardImageElem;
    this.thumbsElem = cardThumbsElem;
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

  public updateBtnCart(): void {
    if (this.btnCartElem) {
      this.btnCartElem.textContent =
        this.btnCartElem.textContent === 'Add to Cart' ? 'Remove from Cart' : 'Add to Cart';
    }
  }
}

export default ProductPageView;
