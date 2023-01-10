import { IProduct } from '../../../types/interfaces';
import { MESSAGES } from '../../app/const';
import State from '../../app/state';

class ProductsView {
  private state: State;
  private productsListElem: HTMLUListElement | null;
  private wrapperElem: HTMLDivElement | null;
  private displayType: string;

  public constructor(state: State) {
    this.state = state;
    this.productsListElem = null;
    this.wrapperElem = null;
    this.displayType = 'tiles';
  }

  public set wrapper(element: HTMLDivElement | null) {
    this.wrapperElem = element;
  }

  public set display(value: string) {
    this.displayType = value;
  }

  public get productsList(): HTMLUListElement | null {
    return this.productsListElem;
  }

  public draw(products: IProduct[]): void {
    if (this.wrapperElem) {
      this.wrapperElem.innerHTML = '';
      const productsElem = products.length === 0 ? this.drawProductsEmptyMessage() : this.drawProducts(products);
      this.wrapperElem.append(productsElem);

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  private drawProducts(products: IProduct[]): HTMLUListElement {
    const productsListElem = document.createElement('ul');
    productsListElem.className = `goods__list goods__${this.displayType}`;

    const productsElems = products.map((product) => this.createProductLiElem(product));
    productsListElem.append(...productsElems);

    this.productsListElem = productsListElem;

    return productsListElem;
  }

  private drawProductsEmptyMessage(): HTMLDivElement {
    const messageElem = document.createElement('div');
    messageElem.className = 'message';

    const textElems = MESSAGES.emptyFilter.map((text) => {
      const textElem = document.createElement('p');
      textElem.className = 'message__text';
      textElem.textContent = text;
      return textElem;
    });

    messageElem.append(...textElems);

    return messageElem;
  }

  public updateProductsDisplay(displayType: string): void {
    if (this.productsList) {
      this.displayType = displayType;
      this.productsList.className = `goods__list goods__${displayType}`;
    }
  }

  public updateBtnToCart(btn: HTMLButtonElement): void {
    btn.textContent = btn.textContent === 'Add to Cart' ? 'Remove from Cart' : 'Add to Cart';
  }

  private createProductLiElem(product: IProduct): HTMLLIElement {
    const liElem = document.createElement('li');
    liElem.className = 'goods__item';
    liElem.dataset.id = product.id.toString();

    const articleElem = document.createElement('article');
    articleElem.className = 'goods-item';

    const linkImageElem = document.createElement('a');
    linkImageElem.className = 'goods-item__link goods-item__link_image';
    linkImageElem.href = `product/${product.id.toString()}`;

    const imageElem = new Image();
    imageElem.className = 'goods-item__image';
    imageElem.src = product.thumbnail;
    imageElem.alt = product.title;

    const discountElem = document.createElement('p');
    discountElem.className = 'goods-item__discount';
    discountElem.textContent = `-${product.discountPercentage.toString()}%`;

    const linkTitleElem = document.createElement('a');
    linkTitleElem.className = 'goods-item__link goods-item__link_title';
    linkTitleElem.href = `product/${product.id.toString()}`;

    const titleElem = document.createElement('h3');
    titleElem.className = 'goods-item__title';
    titleElem.textContent = product.title;

    const descriptionElem = document.createElement('p');
    descriptionElem.className = 'goods-item__description';
    descriptionElem.textContent = product.description;

    const priceRowElem = document.createElement('div');
    priceRowElem.className = 'goods-item__row goods-item__row_price';

    const priceNewElem = document.createElement('p');
    priceNewElem.className = 'goods-item__price goods-item__price_new';
    priceNewElem.textContent = `${product.price.toString()}$`;

    const priceOldElem = document.createElement('p');
    priceOldElem.className = 'goods-item__price goods-item__price_old';
    const oldPrice = Math.round(product.price / (1 - product.discountPercentage / 100));
    priceOldElem.textContent = `${oldPrice.toString()}$`;

    const ratingElem = document.createElement('div');
    ratingElem.className = 'goods-item__rating';
    const ratingActivWidth = Math.round((product.rating * 100) / 5);
    ratingElem.innerHTML = `
      <div class="goods-item__stars stars">
        <div class="stars__row stars__row_inactive"></div>
        <div class="stars__row stars__row_active" style="width: ${ratingActivWidth.toString()}%"></div>
      </div>

    `;

    const stockElem = document.createElement('p');
    stockElem.className = 'goods-item__stock';
    stockElem.innerHTML = `
      <span class="goods-item__stock-text">goods in stock:</span> 
      <span class="goods-item__stock-count">${product.stock.toString()}</span>
    `;

    const toCartBtnElem = document.createElement('button');
    toCartBtnElem.className = 'goods-item__to-cart';
    const isInCart =
      this.state.getState().onlineStoreSettings.cart.filter((cartProduct) => cartProduct.id === product.id).length !==
      0;
    toCartBtnElem.textContent = isInCart ? 'Remove from Cart' : 'Add to Cart';
    toCartBtnElem.dataset.productId = product.id.toString();
    toCartBtnElem.dataset.isInCart = isInCart.toString();

    linkImageElem.append(imageElem, discountElem);
    linkTitleElem.append(titleElem);
    priceRowElem.append(priceNewElem, priceOldElem);

    articleElem.append(
      linkImageElem,
      linkTitleElem,
      descriptionElem,
      priceRowElem,
      ratingElem,
      stockElem,
      toCartBtnElem
    );

    liElem.append(articleElem);

    return liElem;
  }
}

export default ProductsView;
