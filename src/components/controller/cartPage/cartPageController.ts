import State from '../../app/state';
import {
  validate,
  isValid,
  notValid,
  phoneRegex,
  cardNumberRegex,
  cvvCode,
  cardDate,
  mailRegex,
  checkLength,
  validateString,
  nameRegex,
} from './regex';
import CartPageView from '../../view/cartPage/cartPageView';
import PageController from '../pageController';
import { ICartProduct, IProductInLS, IProductLS } from '../../../types/interfaces';
import ModalView from '../../view/cartPage/modalView';
class CartPageController extends PageController {
  view: CartPageView;
  modal: ModalView;

  constructor(state: State) {
    super(state);
    this.view = new CartPageView();
    this.modal = new ModalView();
  }

  start() {
    console.log('Cart Page');
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    const settings = this.state.getState().onlineStoreSettings.promoСodes;
    this.view.render(productsToRender);
    this.view.drawTotal();
    this.view.drawPromo(settings);
    const discount = this.getDiscount(settings);
    const totalPrice = this.view.getTotalPrice(productsToRender);
    const totalNum = this.view.getTotalNum(productsToRender);
    this.view.updateTotalNumber(totalNum);
    this.view.updateTotalPrice(totalPrice);
    if (discount > 0) {
      this.view.updateDiscountPrice(discount, totalPrice);
    }
    this.view.cartTable?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cart-table-row__controls')) {
        const el = target.closest('.cart-table-row__controls') as HTMLElement;
        const id = Number(el.dataset.id);
        const action = target.id;
        this.controlCartButtons(action, id);
      }
    });
    this.getInputValue();
    this.view.updateDiscountPrice(discount, totalPrice);
    this.deletePromocode();
    this.openModal();
    this.checkBuyBtn(cart);
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
            if (promoInput) {
              this.state.addCodeToSettings(val);
              this.updateTotalBlock();
            }
            this.getInputValue();
          }
        });
      }
    });
  }
  deletePromocode() {
    const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
    const codes = ['RSS', 'EPAM'];
    promoBlock?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'delete-code') {
        const code = target.getAttribute('code');
        const res = codes.filter((codeItem) => codeItem === code);
        this.state.dropCodeFromSetting(res[0]);
        this.updateTotalBlock();
        this.getInputValue();
      }
    });
  }

  updateTotalBlock() {
    const settings = this.state.getState().onlineStoreSettings;
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    const discount = settings.promoСodes.length * 0.1;
    const totalPrice = this.view.getTotalPrice(productsToRender);
    this.view.drawPromo(settings.promoСodes);
    this.view.updateDiscountPrice(discount, totalPrice);
    this.checkBuyBtn(cart);
  }

  getProductsToRender(): IProductLS[] {
    const products = this.state.getState().products;
    const cart = this.state.getState().onlineStoreSettings.cart;
    const productsToRender = this.view.identityProducts(cart, products);
    return productsToRender;
  }
  identityProducts(arr: IProductInLS[], state: State): IProductLS[] {
    const pickedProducts = [];
    if (arr.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        const products = state.getState().products;
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

  getDiscount(settings: string[]): number {
    return settings.length * 0.1;
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
      if ((target.className === 'modal__wrapper' || target.className === 'modal__close') && main && modal) {
        main.removeChild(modal);
      }
    });
  }

  updateProductsCartNum(id: number) {
    const productsNum = document.querySelectorAll('.cart-table-row__num');
    const index: number = this.state.getState().onlineStoreSettings.cart.findIndex((cartItem) => cartItem.id === id);
    const num = this.state.getState().onlineStoreSettings.cart.filter((cartItem) => cartItem.id == id);
    productsNum[index].textContent = String(num[0].num);
  }
  controlCartButtons(action: string, id: number) {
    switch (action) {
      case 'btn-delete': {
        this.state.removeProductFromCart(id);
        const num = this.state.getTotalNumInCart();
        const cart = this.getProductsToRender();
        const summ = this.getTotalPrice(cart);
        this.view.updateTotalNumber(num);
        this.view.updateTotalPrice(summ);
        this.view.render(cart);
        this.updateTotalBlock();
        break;
      }
      case 'btn-plus': {
        this.state.addProductToCart(id);
        const num = this.state.getTotalNumInCart();
        const cart = this.getProductsToRender();
        const summ = this.getTotalPrice(cart);
        this.view.updateTotalNumber(num);
        this.view.updateTotalPrice(summ);
        this.updateProductsCartNum(id);
        this.updateTotalBlock();
        break;
      }
      case 'btn-minus': {
        this.state.deleteItemFromCart(id);
        const num = this.state.getTotalNumInCart();
        const cart = this.getProductsToRender();
        const summ = this.getTotalPrice(cart);
        this.view.updateTotalPrice(summ);
        this.view.updateTotalNumber(num);
        this.updateProductsCartNum(id);
        this.updateTotalBlock();
        break;
      }
    }
  }
  checkBuyBtn(cart: ICartProduct[]) {
    const toBuyBtn = document.querySelector('#buy-btn');
    if (toBuyBtn && cart.length > 0) {
      toBuyBtn.classList.remove('inactive');
    } else if (toBuyBtn) {
      toBuyBtn.classList.add('inactive');
    }
  }
  submitForm() {
    const form = this.modal.form;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Проверка полей');
      const phone = this.modal.phoneInp;
      const phoneErr = this.modal.phoneErr;
      const number = this.modal.cardNumInp;
      const numErr = this.modal.cardNumInpErr;
      const ccv = this.modal.ccvInp;
      const ccvErr = this.modal.ccvInpErr;
      const mail = this.modal.mailInp;
      const mailErr = this.modal.mailInpErr;
      if (
        phone &&
        phoneErr &&
        number &&
        numErr &&
        ccv &&
        ccvErr &&
        mail &&
        mailErr &&
        this.checkName() &&
        this.check(phone, phoneErr, phoneRegex, 'Enter valid phone number') &&
        this.checkAddress() &&
        this.check(mail, mailErr, mailRegex, 'Enter valid e-mail') &&
        this.check(number, numErr, cardNumberRegex, 'Enter valid card number') &&
        this.checkDate() &&
        this.check(ccv, ccvErr, cvvCode, 'Enter valid card ccv')
      ) {
        console.log('ok');
        const modal = document.querySelector('.modal');
        const main: HTMLElement | null = document.querySelector('.main');
        if (modal && main) {
          main.removeChild(modal);
          this.modal.drawMessage();
          this.closeModal();
          this.redirect();
          this.state.clearCart();
        }
      } else {
        console.log('not ok');
      }
    });
  }
  check(inp: HTMLInputElement, el: HTMLElement, reg: RegExp, mess: string) {
    let res = false;
    if (inp && el) {
      if (!validate(reg, inp)) {
        notValid(inp, el, mess);
      } else {
        isValid(inp, el);
        res = true;
      }
    }
    return res;
  }
  checkName(): boolean {
    const name = this.modal.fioInp;
    const fioErr = this.modal.fioErr;
    let res = false;
    if (name && fioErr) {
      const val = name.value;
      const fio = val.split(' ');
      console.log(fio.length);
      if (fio.length < 2) {
        notValid(name, fioErr, 'Enter valid name');
      }
      const fName = fio[0];
      const lName = fio[1];
      if (
        !validateString(nameRegex, fName) ||
        !validateString(nameRegex, lName) ||
        !checkLength(fName, 3) ||
        !checkLength(lName, 3)
      ) {
        notValid(name, fioErr, 'Enter valid name');
      } else {
        res = true;
        isValid(name, fioErr);
      }
    }
    return res;
  }
  checkAddress(): boolean {
    const address = this.modal.addressInp;
    const addressErr = this.modal.addressErr;
    let res = false;
    if (address && addressErr) {
      const val = address.value;
      const addr = val.split(' ');
      console.log(addr);
      if (addr.length < 3) {
        notValid(address, addressErr, 'Address must consist of 3 words');
      }
      addr.forEach((item) => {
        if (!checkLength(item, 5) || !validateString(nameRegex, item)) {
          notValid(address, addressErr, 'Enter valid address');
        } else {
          res = true;
          isValid(address, addressErr);
        }
      });
    }
    return res;
  }
  checkDate(): boolean {
    const dateInp = this.modal.dateInt;
    const dateInpErr = this.modal.dateIntErr;
    let res = false;
    if (dateInp && dateInpErr) {
      const day = Number(dateInp.value.slice(0, 2));
      const month = Number(dateInp.value.slice(3));
      if (!validate(cardDate, dateInp) || month > 12 || month < 0 || day > 31) {
        notValid(dateInp, dateInpErr, 'Enter valid card date');
      } else {
        res = true;
        isValid(dateInp, dateInpErr);
      }
    }
    return res;
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
  redirect() {
    setTimeout(function () {
      window.location.href = '/';
    }, 3000);
  }
}

export default CartPageController;
