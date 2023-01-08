import CartPageView from '../../view/cartPage/cartPageView';
import PageController from '../pageController';
import { ICartProduct, IProduct, IProductLS } from '../../../types/interfaces';
import TemplatePageController from '../templatePage/templatePageController';
import { CartTotal, PromoCodes } from '../../../types/types';
import CartPaginationController from './cartPaginationController';
import { PROMO_CODES } from '../../app/const';
class CartPageController extends PageController {
  public view: CartPageView;
  private pagination: CartPaginationController;
  private appliedPromoCodes: string[];
  private totalDiscount: number;

  constructor(templatePage: TemplatePageController) {
    super(templatePage, 'cart');
    this.view = new CartPageView();
    this.pagination = new CartPaginationController((products) => this.view.drawProducts(products));
    this.appliedPromoCodes = [];
    this.totalDiscount = 0;
  }

  start() {
    super.start();
    this.view.wrapper = this.main.view.main;

    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const cartTotal: CartTotal = this.state.calculateCartTotal();
    const productsToDraw = this.identityProducts(cart, products);
    this.appliedPromoCodes = this.state.getState().onlineStoreSettings.promoCodes;

    this.view.draw();
    this.pagination.view.wrapper = this.view.pagination;

    this.pagination.initPagination(productsToDraw);
    this.view.updateLimitInput(this.pagination.limitNum);
    this.view.updateTotal(cartTotal);

    this.view.drawPromoElem();

    this.initDiscount(cartTotal);

    this.view.cartList?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.item__control') && target.closest('.control-btn')) {
        this.handleControlCartButtons(target);
      }
    });

    this.view.limitInput?.addEventListener('change', () => {
      const limit = this.view.limitInput?.value;
      if (limit) this.pagination.updateLimit(+limit);
    });

    this.view.promoInput?.addEventListener('input', () => this.handlePromoCodeInput());

    this.view.promoBlock?.addEventListener('click', (e) => this.handleDropAddBtns(e));
  }

  initDiscount(cartTotal: CartTotal) {
    if (this.appliedPromoCodes) {
      this.totalDiscount = this.calculateDiscount(this.appliedPromoCodes);
      if (this.totalDiscount > 0) {
        const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));
        this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
      }
      this.view.updateAppliedPromoCodes(this.appliedPromoCodes);
    }
  }

  updateDiscount(cartTotal: CartTotal) {
    const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));
    this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
  }

  calculateDiscount(appliedPromoСodes: string[]): number {
    console.log('appliedPromoСodes: ', appliedPromoСodes);
    const discount = appliedPromoСodes.reduce(
      (acc, code) => (code in PROMO_CODES ? acc + PROMO_CODES[code as keyof PromoCodes] : acc),
      0
    );
    console.log('discount: ', discount);

    return discount * 0.01;
  }

  private handlePromoCodeInput() {
    const code: string | undefined = this.view.promoInput?.value;
    if (code && code in PROMO_CODES) {
      const appliedPromoCodes = this.state.getState().onlineStoreSettings.promoCodes;
      if (appliedPromoCodes.includes(code)) {
        this.view.drawPromoCodeUsedMessage();
      } else {
        this.view.updateToApplyPromoCodes(code);
      }
    }
  }

  private handleDropAddBtns(e: Event) {
    const target = e.target as HTMLElement;
    switch (target.id) {
      case 'addCodeBtn': {
        const code = target.dataset.code;
        if (code) this.applyCode(code);
        break;
      }
      case 'dropCodeBtn': {
        const code = target.dataset.code;
        if (code) this.deleteCode(code);
        break;
      }
    }
  }

  private applyCode(code: string) {
    this.state.addCodeToSettings(code);
    this.updateTotalBlock();
    this.view.emptyPromoCodeInput();
  }

  private deleteCode(code: string) {
    this.state.dropCodeFromSetting(code);
    this.updateTotalBlock();
  }

  private updateTotalBlock() {
    this.appliedPromoCodes = this.state.getState().onlineStoreSettings.promoCodes;
    const cartTotal = this.state.calculateCartTotal();
    this.totalDiscount = this.calculateDiscount(this.appliedPromoCodes);
    const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));

    this.view.updateAppliedPromoCodes(this.appliedPromoCodes);
    this.view.updateToApplyPromoCodes();
    this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
  }

  getProductsToRender(): IProductLS[] {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.identityProducts(cart, products);
    console.log('productsToRender: ', productsToRender);
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

  handleControlCartButtons(target: HTMLElement) {
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
          const limit = this.state.getState().onlineStoreSettings.cart.length || 1;
          this.view.updateMaxLimit(limit);
          this.pagination.initPagination(this.getProductsToRender(), true);
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
      this.updateDiscount(cartTotal);
    }
  }
}

export default CartPageController;
