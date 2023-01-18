import { FormInputs } from '../../../types/enums';
import OverlayView from '../../view/overlay/overlayView';
import {
  regexCardDate,
  regexCardNumber,
  regexCvvCode,
  regexEmail,
  regexName,
  regexPhone,
  validate,
  validateLength,
  validateString,
} from '../../app/regex';
import CartModalView from '../../view/cartPage/cartModalView';
import { REDIRECT_TIMIOUT } from '../../app/const';

class CartModalController {
  private cbClearCart: () => void;
  public view: CartModalView;
  private overlay: OverlayView;
  private prevDate: string;

  public constructor(callback: () => void) {
    this.cbClearCart = callback;
    this.view = new CartModalView();
    this.overlay = new OverlayView();
    this.prevDate = '';
  }

  public init(): void {
    this.drawModal();

    this.view.form?.addEventListener('submit', (e) => this.handleSubmitForm(e));

    document.querySelectorAll('.form__input').forEach((item) => {
      item.addEventListener('change', (e) => this.validateInputValue(e));
    });

    this.view.cardNumberInput?.addEventListener('input', () => this.handleImageCreditCard());
    this.view.dateInput?.addEventListener('input', () => this.handleDateInput());
    this.view.phoneInput?.addEventListener('input', () => this.handlePhoneInput());
    this.view.cvvCodeInput?.addEventListener('input', () => this.handleCvvCodeInput());
  }

  public drawModal(): void {
    this.view.draw(this.overlay.drawOverlay());
    this.overlay.overlay?.addEventListener('click', (e) => this.handleOverlay(e));
  }

  public handleOverlay(e: Event): void {
    const target = e.target as HTMLElement;
    if (target && (!target.closest('.modal') || target.closest('.modal__close'))) {
      this.overlay.hideOverlay();
    }
  }

  private checkInputs(): boolean {
    const phone = this.view.phoneInput;
    const cardNumber = this.view.cardNumberInput;
    const ccvCode = this.view.cvvCodeInput;
    const email = this.view.emailInput;

    if (phone && cardNumber && ccvCode && email) {
      const checkName = this.checkName();
      const checkPhone = this.check(phone, regexPhone);
      const checkAddress = this.checkAddress();
      const checkEmail = this.check(email, regexEmail);
      const checkCardNumber = this.check(cardNumber, regexCardNumber);
      const checkDate = this.checkDate();
      const checkCcvCode = this.check(ccvCode, regexCvvCode);

      return checkName && checkPhone && checkAddress && checkEmail && checkCardNumber && checkDate && checkCcvCode;
    }

    return false;
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();
    const isSubmit = this.checkInputs();

    if (isSubmit) {
      if (this.view.nameInput?.value) {
        this.view.drawMessage(this.view.nameInput.value);
      } else {
        this.view.drawMessage();
      }
      this.redirectToMainPage();
      this.cbClearCart();
    }
  }

  private validateInputValue(e: Event): void {
    const target = e.target as HTMLElement;
    switch (target.id) {
      case FormInputs.name:
        this.checkName();
        break;
      case FormInputs.phone:
        if (this.view.phoneInput) this.check(this.view.phoneInput, regexPhone);
        break;
      case FormInputs.email:
        if (this.view.emailInput) this.check(this.view.emailInput, regexEmail);
        break;
      case FormInputs.address:
        this.checkAddress();
        break;
      case FormInputs.cardNumber:
        if (this.view.cardNumberInput) this.check(this.view.cardNumberInput, regexCardNumber);
        break;
      case FormInputs.validDate:
        this.checkDate();
        break;
      case FormInputs.cvvCode:
        if (this.view.cvvCodeInput) this.check(this.view.cvvCodeInput, regexCvvCode);
        break;
    }
  }

  private check(inputElem: HTMLInputElement, regex: RegExp): boolean {
    if (validate(regex, inputElem)) {
      this.view.showValidMessage(inputElem);
      return true;
    }
    this.view.showNotValidMessage(inputElem);
    return false;
  }

  private checkName(): boolean {
    if (this.view.nameInput) {
      const value = this.view.nameInput.value;
      const fio = value.trim().split(' ');
      if (fio.length < 2) {
        this.view.showNotValidMessage(this.view.nameInput);
        return false;
      } else {
        const fName = fio[0];
        const lName = fio[1];
        if (
          !validateString(regexName, fName) ||
          !validateString(regexName, lName) ||
          !validateLength(fName, 3) ||
          !validateLength(lName, 3)
        ) {
          this.view.showNotValidMessage(this.view.nameInput);
          return false;
        } else {
          this.view.showValidMessage(this.view.nameInput);
          return true;
        }
      }
    }
    return false;
  }

  private checkAddress(): boolean {
    if (this.view.addressInput) {
      const value = this.view.addressInput.value;
      const address = value.split(' ');
      if (address.length < 3) {
        this.view.showNotValidMessage(this.view.addressInput);
      } else {
        const isInvalid = address
          .map((item) => {
            if (validateLength(item, 5)) {
              return 'valid';
            }
            return 'invalid';
          })
          .some((item) => item === 'invalid');
        if (isInvalid) {
          this.view.showNotValidMessage(this.view.addressInput);
          return false;
        } else {
          this.view.showValidMessage(this.view.addressInput);
          return true;
        }
      }
    }
    return false;
  }

  private checkDate(): boolean {
    if (this.view.dateInput) {
      const value = this.view.dateInput.value;
      const month = Number(value.slice(0, 2));
      const year = Number(value.slice(3, 5));
      if (!validate(regexCardDate, this.view.dateInput) || month > 12 || month < 1 || year < 23) {
        this.view.showNotValidMessage(this.view.dateInput);
        return false;
      } else {
        this.view.showValidMessage(this.view.dateInput);
        return true;
      }
    }
    return false;
  }

  private handlePhoneInput(): void {
    if (this.view.phoneInput) {
      let value = this.view.phoneInput.value;
      if (value.length === 1 && value !== '+') {
        value = `+${value}`;
        this.view.phoneInput.value = value;
      }
    }
  }

  private handleImageCreditCard(): void {
    if (this.view.cardNumberInput) {
      const value = this.view.cardNumberInput.value;
      switch (value[0]) {
        case '4':
          this.view.updateCardImage('visa');
          break;
        case '5':
          this.view.updateCardImage('mastercard');
          break;
        case '1':
          this.view.updateCardImage('union');
          break;
        case '2':
          this.view.updateCardImage('mir');
          break;
      }
    }
  }

  private handleDateInput(): void {
    if (this.view.dateInput) {
      const value = this.view.dateInput.value;
      if (value.length === 2 && this.prevDate.length < 3) {
        this.view.dateInput.value = value + '/';
      }
      if (value.length > 5) {
        this.view.dateInput.value = value.slice(0, 5);
      }
      this.prevDate = this.view.dateInput.value;
    }
  }

  private handleCvvCodeInput(): void {
    if (this.view.cvvCodeInput) {
      const value = this.view.cvvCodeInput.value;
      if (value.length > 3) {
        this.view.cvvCodeInput.value = value.slice(0, 4);
      }
    }
  }

  private redirectToMainPage(): void {
    setTimeout(() => {
      this.overlay.hideOverlay();
      window.location.href = '/';
    }, REDIRECT_TIMIOUT);
  }
}

export default CartModalController;
