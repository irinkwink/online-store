import CartPageView from '../../view/cartPage/cartPageView';
import PageController from '../pageController';
import { validate, isValid, notValid, phoneRegex, cardNumberRegex, cvvCode, cardDate, mailRegex } from './regex';
import { ICartProduct, IProduct, IProductLS } from '../../../types/interfaces';
import TemplatePageController from '../templatePage/templatePageController';
import { CartTotal, PromoCodes } from '../../../types/types';
import CartPaginationController from './cartPaginationController';
import { PROMO_CODES } from '../../app/const';
import ModalView from '../../view/cartPage/modalView';
class CartPageController extends PageController {
  public view: CartPageView;
  private pagination: CartPaginationController;
  private appliedPromoCodes: string[];
  private totalDiscount: number;
  modal: ModalView;

  public constructor(templatePage: TemplatePageController) {
    super(templatePage, 'cart');
    this.view = new CartPageView();
    this.modal = new ModalView();
    this.pagination = new CartPaginationController((products) => this.view.drawProducts(products));
    this.appliedPromoCodes = [];
    this.totalDiscount = 0;
  }

  public start(): void {
    super.start();
    this.view.wrapper = this.main.view.main;

    const productsToDraw = this.getProductsToDraw();
    const cartTotal: CartTotal = this.state.calculateCartTotal();

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

  private getProductsToDraw(): IProductLS[] {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToDraw = this.identityProducts(cart, products);
    return productsToDraw;
  }

  private initDiscount(cartTotal: CartTotal): void {
    if (this.appliedPromoCodes) {
      this.totalDiscount = this.calculateDiscount(this.appliedPromoCodes);
      if (this.totalDiscount > 0) {
        const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));
        this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
      }
      this.view.updateAppliedPromoCodes(this.appliedPromoCodes);
    }
  }

  private updateDiscount(cartTotal: CartTotal): void {
    const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));
    this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
  }

  private calculateDiscount(appliedPromoСodes: string[]): number {
    const discount = appliedPromoСodes.reduce(
      (acc, code) => (code in PROMO_CODES ? acc + PROMO_CODES[code as keyof PromoCodes] : acc),
      0
    );

    return discount * 0.01;
  }

  private handlePromoCodeInput(): void {
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

  private handleDropAddBtns(e: Event): void {
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

  private applyCode(code: string): void {
    this.state.addCodeToSettings(code);
    this.updateTotalBlock();
    this.view.emptyPromoCodeInput();
  }

  private deleteCode(code: string): void {
    this.state.dropCodeFromSetting(code);
    this.updateTotalBlock();
  }

  private updateTotalBlock(): void {
    this.appliedPromoCodes = this.state.getState().onlineStoreSettings.promoCodes;
    const cartTotal = this.state.calculateCartTotal();
    this.totalDiscount = this.calculateDiscount(this.appliedPromoCodes);
    const discountPrice = Math.floor(cartTotal.totalPrice * (1 - this.totalDiscount));

    this.view.updateAppliedPromoCodes(this.appliedPromoCodes);
    this.view.updateToApplyPromoCodes();
    this.view.updateDiscountPrice(discountPrice, this.totalDiscount === 0);
  }

  private identityProducts(cart: ICartProduct[], products: IProduct[]): IProductLS[] {
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

  private handleControlCartButtons(target: HTMLElement): void {
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
          this.pagination.initPagination(this.getProductsToDraw(), true);
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

  openModal() {
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    promoBlock?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'buy-btn') {
        this.modal.drawModal();
        this.closeModal();
        this.submitForm();
        this.setImageCreditCard();
        this.setCardDate();
        this.setPlus();
      }
    });
  }

  closeModal() {
    const modalWrapper: HTMLElement | null = document.querySelector('.modal__wrapper');
    const modal = document.querySelector('.modal');
    const main: HTMLElement | null = document.querySelector('.main');
    modalWrapper?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.className === 'modal__wrapper' && main && modal) {
        main.removeChild(modal);
      }
    });
  }

  submitForm() {
    const form = this.modal.form;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Проверка полей');
      this.checkName();
      this.checkPhone();
      this.checkAddress();
      this.checkCreditNumber();
      this.checkCcv();
      this.checkDate();
      this.checkMail();
    });
  }
  check(inp: HTMLInputElement, el: HTMLElement, reg: RegExp, mess: string) {
    if (inp && el) {
      if (!validate(reg, inp)) {
        notValid(inp, el, mess);
      } else {
        isValid(inp, el);
      }
    }
  }
  checkName() {
    const name = this.modal.fioInp;
    const fioErr = this.modal.fioErr;
    if (name && fioErr) {
      const val = name.value;
      const fio = val.split(' ');
      if (fio.length < 2) {
        notValid(name, fioErr, 'Enter valid name');
      }
      const fName = fio[0];
      const lName = fio[1];
      if (fName.length < 3 || lName.length < 3) {
        notValid(name, fioErr, 'Enter valid name');
      } else {
        isValid(name, fioErr);
      }
    }
  }
  checkPhone() {
    const phone = this.modal.phoneInp;
    const phoneErr = this.modal.phoneErr;
    if (phone && phoneErr) {
      if (!validate(phoneRegex, phone)) {
        notValid(phone, phoneErr, 'Enter valid phone number');
      } else {
        isValid(phone, phoneErr);
      }
    }
  }
  checkAddress() {
    const address = this.modal.addressInp;
    const addressErr = this.modal.addressErr;
    if (address && addressErr) {
      const val = address.value;
      const addr = val.split(' ');
      addr.forEach((item) => {
        if (item.length < 5 || addr.length < 3) {
          notValid(address, addressErr, 'Enter valid address');
        } else {
          isValid(address, addressErr);
        }
      });
    }
  }
  checkCreditNumber() {
    const number = this.modal.cardNumInp;
    const numErr = this.modal.cardNumInpErr;

    if (number && numErr) {
      if (!validate(cardNumberRegex, number)) {
        notValid(number, numErr, 'Enter valid card number');
      } else {
        isValid(number, numErr);
      }
    }
  }
  checkCcv() {
    const ccv = this.modal.ccvInp;
    const ccvErr = this.modal.ccvInpErr;
    if (ccv && ccvErr) {
      if (!validate(cvvCode, ccv)) {
        notValid(ccv, ccvErr, 'Enter valid card ccv');
      } else {
        isValid(ccv, ccvErr);
      }
    }
  }
  checkDate() {
    const dateInp = this.modal.dateInt;
    const dateInpErr = this.modal.dateIntErr;
    if (dateInp && dateInpErr) {
      const day = Number(dateInp.value.slice(0, 2));
      const month = Number(dateInp.value.slice(3));
      if (!validate(cardDate, dateInp) || month > 12 || month < 0 || day > 31) {
        notValid(dateInp, dateInpErr, 'Enter valid card date');
      } else {
        isValid(dateInp, dateInpErr);
      }
    }
  }
  checkMail() {
    const mail = this.modal.mailInp;
    const mailErr = this.modal.mailInpErr;

    if (mail && mailErr) {
      if (!validate(mailRegex, mail)) {
        notValid(mail, mailErr, 'Enter valid e-mail');
      } else {
        isValid(mail, mailErr);
      }
    }
  }
  setImageCreditCard() {
    const subtitle = document.querySelector('.modal__subtitle');
    const cardNumInp = this.modal.cardNumInp;
    cardNumInp?.addEventListener('input', () => {
      if (cardNumInp && subtitle) {
        const val = cardNumInp.value[0];
        if (val === String(4)) {
          subtitle.classList.remove('modal__subtitle_mastercard', 'modal__subtitle_union');
          subtitle.classList.add('modal__subtitle_visa');
        } else if (val === String(5)) {
          subtitle.classList.remove('modal__subtitle_visa', 'modal__subtitle_union');
          subtitle.classList.add('modal__subtitle_mastercard');
        } else if (val === String(1)) {
          subtitle.classList.remove('modal__subtitle_visa', 'modal__subtitle_mastercard');
          subtitle.classList.add('modal__subtitle_union');
        }
      }
    });
  }
  setCardDate() {
    const dateInp = this.modal.dateInt;
    dateInp?.addEventListener('input', () => {
      if (dateInp) {
        const val = dateInp.value;
        if (val.length === 2) {
          dateInp.value = val + '/';
        }
      }
    });
  }
  setPlus() {
    const phone = this.modal.phoneInp;
    phone?.addEventListener('input', () => {
      if (phone) {
        let val = phone.value;
        if (val.length === 1) {
          val = '+';
          phone.value = val;
        }
      }
    });
  }
}

export default CartPageController;
