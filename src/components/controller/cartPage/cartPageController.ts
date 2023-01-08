import CartPageView from '../../view/cartPage/cartPageView';
//import { storageUtility } from '../../view/localStorage/LocalStorage';
import PageController from '../pageController';
import { ICartProduct, IProduct, IProductLS } from '../../../types/interfaces';
import TemplatePageController from '../templatePage/templatePageController';
import { CartTotal } from '../../../types/types';
import CartPaginationController from './cartPaginationController';
class CartPageController extends PageController {
  view: CartPageView;
  pagination: CartPaginationController;

  constructor(templatePage: TemplatePageController) {
    super(templatePage, 'cart');
    this.view = new CartPageView();
    this.pagination = new CartPaginationController((products) => this.view.drawProducts(products));
  }

  start() {
    console.log('Cart Page');
    super.start();
    this.view.wrapper = this.main.view.main;

    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.identityProducts(cart, products);
    const settings = this.state.getState().onlineStoreSettings.promoСodes;

    this.view.draw();
    this.pagination.view.wrapper = this.view.pagination;

    this.pagination.init(productsToRender);
    this.view.updateLimit(this.pagination.limitNum);

    this.view.drawPromoBlock(settings);

    const discount = this.getDiscount(settings);
    const cartTotal: CartTotal = this.state.calculateCartTotal();
    this.view.updateTotal(cartTotal);

    if (discount > 0) {
      const discountPrice = cartTotal.totalPrice * (1 - discount);
      this.view.updateDiscountPrice(discountPrice);
    }

    this.view.cartList?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.item__control') && target.closest('.control-btn')) {
        this.controlCartButtons(target);
      }
    });

    this.getInputValue();

    this.view.limitInput?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        this.pagination.updateLimit(+target.value);
      }
    });
  }

  public getInputValue() {
    const promoInput: HTMLInputElement | null = document.querySelector('.promo-block__input');
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    promoInput?.addEventListener('input', () => {
      const val: string = promoInput.value;
      const isValid = this.state.checkPromoCodes(val);
      this.view.drawPromoApplied(isValid, val);
      if (isValid) {
        promoBlock?.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (target.id === 'add-code') {
            const promoInput: HTMLInputElement | null = document.querySelector('.promo-block__input');
            if (promoInput) {
              const val: string = promoInput.value;
              this.state.addCodeToSettings(val);
              promoInput.value = '';
              target.classList.add('inactive');
              const settings = this.state.getState().onlineStoreSettings;
              const products = this.state.getState().products;
              const cart = this.state.getState().onlineStoreSettings.cart;
              const productsToRender = this.identityProducts(cart, products);
              const discount = settings.promoСodes.length;
              const totalPrice = this.getTotalPrice(productsToRender);
              this.view.drawPromoBlock(settings.promoСodes);
              const discountPrice = totalPrice * (1 - discount);
              this.view.updateDiscountPrice(discountPrice);
            }
          }
        });
      }
    });
  }

  getProductsToRender(): IProductLS[] {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.identityProducts(cart, products);
    return productsToRender;
  }

  identityProducts(cart: ICartProduct[], products: IProduct[]): IProductLS[] {
    const pickedProducts = [];
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const fined = products.filter((item) => item.id == cart[i].id);
        const num = cart[i].num;
        const res: IProductLS[] = JSON.parse(JSON.stringify(fined));
        res.forEach((item) => {
          item.num = num;
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

  getDiscount(settings: string[]): number {
    return settings.length * 0.1;
  }

  // updateProductsCartNum(id: number) {
  //   const productsNum = document.querySelectorAll('.item__number');
  //   const cart = this.state.getState().onlineStoreSettings.cart;
  //   const index: number = cart.findIndex((cartItem) => cartItem.id === id);
  //   productsNum[index].textContent = String(cart[index].num);
  // }

  controlCartButtons(target: HTMLElement) {
    const controlElem = target.closest('.item__control') as HTMLElement;
    const btnElem = target.closest('.control-btn') as HTMLElement;
    const idData = controlElem.dataset.productId;
    const numberData = controlElem.dataset.productNumber;
    const stockData = controlElem.dataset.productStock;
    if (idData && numberData && stockData) {
      const id = +idData;
      let number = +numberData;
      const stock = +stockData;
      switch (btnElem.id) {
        case 'btn-delete': {
          this.state.removeProductFromCart(id);
          this.pagination.init(this.getProductsToRender(), true);
          break;
        }
        case 'btn-plus': {
          if (number < stock) {
            number += 1;
            this.view.updateControl(controlElem, number, number === stock);
            this.state.addProductToCart(id);
          }
          break;
        }
        case 'btn-minus': {
          if (number > 1) {
            number -= 1;
            this.view.updateControl(controlElem, number, number === stock);
            this.state.deleteItemFromCart(id);
          }
          break;
        }
      }
      const cartTotal = this.state.calculateCartTotal();
      this.view.updateTotal(cartTotal);
      this.header.view.updateCartTotal(cartTotal);
    }
  }
}

export default CartPageController;
