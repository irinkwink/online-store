import { IProduct } from '../../../types/interfaces';

const createProductHTML = (item: IProduct) => {
  const liElem = document.createElement('li');
  liElem.className = 'goods__item';
  liElem.dataset.id = item.id.toString();

  const articleElem = document.createElement('article');
  articleElem.classList.add('goods-item');

  const linkImageElem = document.createElement('a');
  linkImageElem.className = 'goods-item__link goods-item__link_image';
  linkImageElem.href = `card.html?id=${item.id.toString()}`;

  const imageElem = new Image();
  imageElem.className = 'goods-item__image';
  imageElem.src = item.thumbnail;
  imageElem.alt = item.title;

  const discountElem = document.createElement('p');
  discountElem.className = 'goods-item__discount';
  discountElem.textContent = `- ${item.discountPercentage.toString()} %`;

  const linkTitleElem = document.createElement('a');
  linkTitleElem.className = 'goods-item__link goods-item__link_title';
  linkTitleElem.href = `card.html?id=${item.id.toString()}`;

  const titleElem = document.createElement('h3');
  titleElem.className = 'goods-item__title';
  titleElem.textContent = item.title;

  const descriptionElem = document.createElement('p');
  descriptionElem.className = 'goods-item__description';
  descriptionElem.textContent = item.description;

  const priceRowElem = document.createElement('div');
  priceRowElem.className = 'goods-item__row goods-item__row_price';

  const priceNewElem = document.createElement('p');
  priceNewElem.className = 'goods-item__price goods-item__price_new';
  priceNewElem.textContent = `${item.price.toString()}$`;

  const priceOldElem = document.createElement('p');
  priceOldElem.className = 'goods-item__price goods-item__price_old';
  const oldPrice = Math.round(item.price / (1 - item.discountPercentage / 100));
  priceOldElem.textContent = `${oldPrice.toString()}$`;

  const ratingElem = document.createElement('div');
  ratingElem.className = 'goods-item__rating';
  ratingElem.innerHTML = `
    <div class="goods-item__stars stars">
      <div class="stars__row stars__row_inactive"></div>
      <div class="stars__row stars__row_active"></div>
    </div>
    <p class="goods-item__rate">${item.rating.toString()}</p>
  `;

  const stockElem = document.createElement('p');
  stockElem.className = 'goods-item__stock';
  stockElem.innerHTML = `
    <span class="goods-item__stock-text">goods in stock:</span> 
    <span class="goods-item__stock-count">${item.stock.toString()}</span>
  `;

  const toCartBtnElem = document.createElement('button');
  toCartBtnElem.className = 'goods-item__to-cart';
  toCartBtnElem.textContent = 'Add to Cart';
  toCartBtnElem.dataset.idGoods = item.id.toString();

  linkImageElem.append(imageElem, discountElem);
  linkTitleElem.append(titleElem);
  priceRowElem.append(priceNewElem, priceOldElem);

  articleElem.append(linkImageElem, linkTitleElem, descriptionElem, priceRowElem, ratingElem, stockElem, toCartBtnElem);

  liElem.append(articleElem);

  return liElem;
};

class Products {
  draw(data: IProduct[]) {
    const products = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const productsListElem: HTMLElement | null = document.querySelector('.goods__list');

    const productsElems = products.map(createProductHTML);

    if (productsListElem) {
      productsListElem.innerHTML = '';
      productsListElem.append(...productsElems);
    }
  }
}

export default Products;
