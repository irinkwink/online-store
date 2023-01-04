import { IProduct } from '../../../types/interfaces';
import State from '../../app/state';
import { storageUtility } from '../localStorage/LocalStorage';

class Products {
  private state: State;
  toCartBtnElem: HTMLButtonElement | null;

  constructor(state: State) {
    this.state = state;
    this.toCartBtnElem = null;
  }

  public draw(products: IProduct[]): void {
    const productsListElem: HTMLElement | null = document.querySelector('.goods__list');

    if (productsListElem) {
      productsListElem.innerHTML = '';
      const productsElems = products.map((product) => this.createProductHTML(product));
      productsListElem.append(...productsElems);
    }
  }

  private createProductHTML(product: IProduct): HTMLLIElement {
    const liElem = document.createElement('li');
    liElem.className = 'goods__item';
    liElem.dataset.id = product.id.toString();

    const articleElem = document.createElement('article');
    articleElem.classList.add('goods-item');

    const linkImageElem = document.createElement('a');
    linkImageElem.className = 'goods-item__link goods-item__link_image';
    linkImageElem.href = `card.html?id=${product.id.toString()}`;

    const imageElem = new Image();
    imageElem.className = 'goods-item__image';
    imageElem.src = product.thumbnail;
    imageElem.alt = product.title;

    const discountElem = document.createElement('p');
    discountElem.className = 'goods-item__discount';
    discountElem.textContent = `-${product.discountPercentage.toString()}%`;

    const linkTitleElem = document.createElement('a');
    linkTitleElem.className = 'goods-item__link goods-item__link_title';
    linkTitleElem.href = `card.html?id=${product.id.toString()}`;

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
      <p class="goods-item__rate">${product.rating.toString()}</p>
    `;

    const stockElem = document.createElement('p');
    stockElem.className = 'goods-item__stock';
    stockElem.innerHTML = `
      <span class="goods-item__stock-text">goods in stock:</span> 
      <span class="goods-item__stock-count">${product.stock.toString()}</span>
    `;

    const toCartBtnElem = document.createElement('button');
    toCartBtnElem.className = 'goods-item__to-cart';
    const isInCart = this.state.getState().cart.filter((cartProduct) => cartProduct.id === product.id).length !== 0;
    toCartBtnElem.textContent = isInCart ? 'Remove from Cart' : 'Add to Cart';
    toCartBtnElem.dataset.idGoods = product.id.toString();
    toCartBtnElem.addEventListener('click', defineIdProduct);

    this.toCartBtnElem = toCartBtnElem;

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

function defineIdProduct(e: Event): void {
  const target = e.currentTarget as Element;
  const id = Number(target.getAttribute('data-id-goods'));
  const btnState = storageUtility.isExist(id);
  storageUtility.addProductsToLS(id);
  target.innerHTML = storageUtility.updateCartBtn(btnState);
  const productsInLS = storageUtility.getProducts();
  const headerCartNum: HTMLElement | null = document.querySelector('.header__cart-text.header__cart-number');
  if (headerCartNum) {
    headerCartNum.innerHTML = String(productsInLS.length - 1);
  }
}

export default Products;
