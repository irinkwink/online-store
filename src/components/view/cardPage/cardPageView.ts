import { IProduct } from '../../../types/interfaces';

class CardPageView {
  drawCard(product: IProduct) {
    const main = document.querySelector('main');

    if (main) {
      main.append(this.createCardElement(product));
    }
  }

  createImageItem(url: string) {
    const imageElem = new Image();
    imageElem.className = 'card__thumb';
    imageElem.src = url;

    return imageElem;
  }

  createCardElement(product: IProduct) {
    const containerElem = document.createElement('div');
    containerElem.className = 'container';

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

    const cardImageElem = document.createElement('div');
    cardImageElem.className = 'card__main-image';

    const discountElem = document.createElement('p');
    discountElem.className = 'card__discount';
    discountElem.textContent = `-${product.discountPercentage.toString()}%`;

    const imageElem = new Image();
    imageElem.className = 'card__image';
    imageElem.src = product.images[0];
    imageElem.alt = product.title;

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
    cardBtnDecElem.className = 'card__btn card__btn_dec';
    cardBtnDecElem.textContent = '–';

    const cardCountNumberElem = document.createElement('output');
    cardCountNumberElem.className = 'card__number';
    cardCountNumberElem.textContent = '1';

    const cardBtnIncElem = document.createElement('button');
    cardBtnIncElem.className = 'card__btn card__btn_inc';
    cardBtnIncElem.textContent = '+';

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
    toCartBtnElem.textContent = 'Add to Cart';
    toCartBtnElem.dataset.idGoods = product.id.toString();

    const oneClickBtnElem = document.createElement('button');
    oneClickBtnElem.className = 'btn card__button card__button_one-click';
    oneClickBtnElem.textContent = 'Buy in one click';
    oneClickBtnElem.dataset.idGoods = product.id.toString();

    cardImageElem.append(imageElem, discountElem);
    cardGalleryElem.append(cardImageElem, cardThumbsElem);

    cardCountElem.append(cardBtnDecElem, cardCountNumberElem, cardBtnIncElem);
    priceRowElem.append(priceNewElem, priceOldElem);

    cardControlElem.append(cardCountElem, priceRowElem, stockElem, toCartBtnElem, oneClickBtnElem);

    cardInfoElem.append(cardTitleElem, ratingElem, cardDescriptionElem, cardControlElem);

    cardDetailsElem.append(cardGalleryElem, cardInfoElem);
    cardArticleElem.append(cardBreadcrumbsElem, cardDetailsElem);
    containerElem.append(cardArticleElem);

    return containerElem;
  }
}

export default CardPageView;

// export interface IProduct {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
// }
