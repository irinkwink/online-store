import { IProduct, IProductInLS, IProductLS } from '../../../types/interfaces';

export class CartPageView {
  products?: IProduct[];
  productsInLS? = [null];
  cartTable: HTMLUListElement | null;
  promoInput: HTMLInputElement | null;
  promoBlock: HTMLElement | null;

  constructor() {
    this.products = [];
    this.cartTable = null;
    this.promoInput = null;
    this.promoBlock = null;
  }

  identityProducts(arr: IProductInLS[], products: IProduct[]): IProductLS[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const fined = products.filter((item) => item.id == arr[i].id);
        const num = arr[i].num;
        const btnState = arr[i].btnState;
        const res: IProductLS[] = JSON.parse(JSON.stringify(fined));
        res.forEach(function (item) {
          item.num = num;
          item.btnState = btnState;
        });
        if (res.length > 0) {
          pickedProducts.push(...res);
        }
      }
    } else {
      return [];
    }
    return pickedProducts;
  }
  getTotalPrice(productsInCart: IProductLS[]): number {
    let totalPrice = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      const num = productsInCart[i].num;
      totalPrice += productsInCart[i].price * num;
    }
    return totalPrice;
  }

  getTotalNum(productsInCart: IProductLS[]): number {
    let totalNum = 0;
    productsInCart.forEach((product) => (totalNum += product.num));
    return totalNum;
  }

  render(productsInCart: IProductLS[]) {
    const cartTable: HTMLElement | null = document.querySelector('.cart-table');
    if (productsInCart.length > 0) {
      if (cartTable) {
        cartTable.innerHTML = '';
        let number = 1;
        productsInCart.forEach(function (product) {
          const tableRow = document.createElement('div');
          tableRow.className = 'cart-table__row cart-table-row';
          const productsNumber = document.createElement('span');
          productsNumber.innerHTML = String(number);
          productsNumber.className = 'cart-table-row__number';
          const productImage = new Image();
          productImage.className = 'cart-table-row__img';
          productImage.src = product.thumbnail;
          productImage.alt = product.title;
          const productLink = document.createElement('a');
          productLink.className = 'cart-table-row__link';
          productLink.href = `/product.html?id=${product.id}`;
          const productInfo = document.createElement('div');
          productInfo.className = 'cart-table-row__info';
          const productTitle = document.createElement('h3');
          productTitle.className = 'cart-table-row__title';
          productTitle.innerHTML = `${product.title}`;
          const productDesc = document.createElement('div');
          productDesc.className = 'cart-table-row__desc';
          productDesc.innerHTML = `${product.description}`;
          const productStock = document.createElement('div');
          productStock.className = 'cart-table-row__stock';
          productStock.innerHTML = `Stock - ${product.stock}`;
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
          productInfo.append(productTitle, productDesc, productStock, ratingElem);
          productLink.append(productImage, productInfo);
          const productPrice = document.createElement('div');
          productPrice.className = 'cart-table-row__price';
          productPrice.innerHTML = `${product.price}$`;
          const productControls = document.createElement('div');
          productControls.className = 'cart-table-row__controls';
          productControls.dataset.id = String(product.id);
          const plusBtn = document.createElement('button');
          plusBtn.className = 'btn cart-table-row__btn';
          plusBtn.id = 'btn-plus';
          plusBtn.textContent = '+';
          const minusBtn = document.createElement('button');
          minusBtn.className = 'btn cart-table-row__btn';
          minusBtn.id = 'btn-minus';
          minusBtn.textContent = '-';
          const productsNum = document.createElement('span');
          productsNum.className = 'cart-table-row__num';
          const productDelBtn = document.createElement('button');
          productDelBtn.className = 'btn cart-table-row__delete';
          productDelBtn.id = 'btn-delete';
          productsNum.textContent = String(product.num);
          productControls.append(minusBtn, productsNum, plusBtn, productDelBtn);
          tableRow.append(productsNumber, productLink, productPrice, productControls);
          cartTable.append(tableRow);
          number += 1;
        });
      }
    } else {
      if (cartTable) {
        cartTable.innerHTML = 'Please,go shopping!';
        cartTable.className = 'cart-table__info';
      }
    }
  }
  drawTotal(products: IProduct[]) {
    if (products.length > 0) {
      const cartTableWr: HTMLUListElement | null = document.querySelector('.cart__wr');
      this.cartTable = cartTableWr;
      const total = document.createElement('div');
      total.className = 'total';
      const totalHead = document.createElement('div');
      totalHead.className = 'total__head';
      totalHead.textContent = 'Summary';
      const totalSummary = document.createElement('div');
      totalSummary.className = 'total__header';
      const totalPrice = document.createElement('span');
      totalPrice.className = 'total__price';
      totalSummary.append(totalPrice);
      totalSummary.insertAdjacentHTML(
        'afterbegin',
        `

            <span class="total-price">Total price</span>
        `
      );
      const totalSummaryDiscount = document.createElement('div');
      totalSummaryDiscount.className = 'total__discount';
      const totalRow = document.createElement('div');
      totalRow.className = 'total__row';
      const totalNum = document.createElement('span');
      const totalText = document.createElement('span');
      totalText.textContent = 'Products: ';
      totalNum.className = 'total-num';
      totalRow.append(totalText, totalNum);
      total.append(totalHead, totalRow, totalSummary, totalSummaryDiscount);
      if (cartTableWr) {
        cartTableWr.append(total);
      }
    }
  }

  drawPromo(settings: string[]) {
    const total: HTMLElement | null = document.querySelector('.total');
    const promoBlockWr: HTMLElement | null = document.querySelector('.promo-block');
    if (promoBlockWr) {
      promoBlockWr.innerHTML = '';
      promoBlockWr.className = 'promo-block';
      const promoInput = document.createElement('input');
      promoInput.type = 'text';
      promoInput.className = 'promo-block__input';
      promoInput.placeholder = 'Enter promo code';
      const codeInfo = document.createElement('p');
      codeInfo.textContent = "Promo for test: 'RSS', 'EPAM'";
      this.promoBlock = promoBlockWr;
      const toBuyBtn = document.createElement('button');
      toBuyBtn.id = 'buy-btn';
      toBuyBtn.className = 'btn total__to-buy';
      toBuyBtn.textContent = 'Buy';
      if (settings.length > 0) {
        const appliedTitle = document.createElement('h4');
        appliedTitle.className = 'promo-block__title';
        const promoContainer = document.createElement('div');
        promoContainer.innerHTML = '';
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
          delCodeBtn.className = 'btn';
          delCodeBtn.textContent = 'Drop';
          delCodeBtn.dataset.code = setItem;
          row.append(promoApplied, delCodeBtn);
          promoContainer.insertAdjacentElement('beforeend', row);
        });
        promoBlockWr?.append(promoContainer, promoInput, codeInfo, toBuyBtn);
      } else {
        promoBlockWr?.append(promoInput, codeInfo, toBuyBtn);
      }
      if (total) {
        total.insertAdjacentElement('beforeend', promoBlockWr);
      }
    } else {
      const promoBlockWr: HTMLElement | null = document.createElement('div');
      promoBlockWr.innerHTML = '';
      promoBlockWr.className = 'promo-block';
      const promoInput = document.createElement('input');
      promoInput.type = 'text';
      promoInput.className = 'promo-block__input';
      promoInput.placeholder = 'Enter promo code';
      const codeInfo = document.createElement('p');
      codeInfo.textContent = "Promo for test: 'RSS', 'EPAM'";
      this.promoBlock = promoBlockWr;
      const toBuyBtn = document.createElement('button');
      toBuyBtn.id = 'buy-btn';
      toBuyBtn.className = 'btn total__to-buy';
      toBuyBtn.textContent = 'Buy';
      if (settings.length > 0) {
        const appliedTitle = document.createElement('h4');
        appliedTitle.className = 'promo-block__title';
        const promoContainer = document.createElement('div');
        promoContainer.innerHTML = '';
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
          delCodeBtn.className = 'btn';
          delCodeBtn.textContent = 'Drop';
          row.append(promoApplied, delCodeBtn);
          promoContainer.insertAdjacentElement('beforeend', row);
        });
        promoBlockWr?.append(promoContainer, promoInput, codeInfo, toBuyBtn);
      } else {
        promoBlockWr?.append(promoInput, codeInfo, toBuyBtn);
      }
      if (total) {
        total.insertAdjacentElement('beforeend', promoBlockWr);
      }
    }
  }

  drawPromoApplied(isValid: boolean, code: string) {
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    if (isValid && promoBlock) {
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
      promoBlock.append(row);
    }
  }
  updateTotalNumber(total: number) {
    const totalNum = document.querySelector('.total-num');
    const totalHeader = document.querySelector('.header__cart-number');
    if (totalNum && totalHeader) {
      totalNum.textContent = total.toString();
      totalHeader.textContent = total.toString();
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
    } else if (totalSummary && discountTotalPrice) {
      totalSummary.className = 'total__header';
      discountTotalPrice.innerHTML = '';
    }
  }
}

export default CartPageView;
