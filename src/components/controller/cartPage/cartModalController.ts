import { FormInputs } from '../../../types/enums';
import CartModalView from '../../view/cartPage/cartModalView';
import OverlayView from '../../view/overlay/overlayView';
import { regexCardDate, regexCardNumber, regexCvvCode, regexEmail, regexPhone, validate } from '../../app/regex';

class CartModalController {
  public view: CartModalView;
  private overlay: OverlayView;
  private prevDate: string;

  public constructor() {
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

  private handleSubmitForm(e: Event): void {
    e.preventDefault();
    console.log('Проверка полей');
  }

  private validateInputValue(e: Event): void {
    const target = e.target as HTMLElement;
    if (target && target instanceof HTMLInputElement) {
      console.log('target: ', target);
      console.log('target.id: ', target.id);
      console.log('target.value: ', target.value);
      switch (target.id) {
        case FormInputs.name: {
          this.checkName(target);
          break;
        }
        case FormInputs.phone: {
          this.check(target, regexPhone);
          // this.checkPhone();
          break;
        }
        case FormInputs.email: {
          this.check(target, regexEmail);
          // this.checkEmail();
          break;
        }
        case FormInputs.address: {
          this.checkAddress(target);
          break;
        }
        case FormInputs.cardNumber: {
          this.check(target, regexCardNumber);
          // this.checkCreditNumber();
          break;
        }
        case FormInputs.validDate: {
          this.check(target, regexCardDate);
          // this.checkDate();
          break;
        }
        case FormInputs.cvvCode: {
          this.check(target, regexCvvCode);
          // this.checkCcv();
          break;
        }
      }
    }
  }

  private check(inputElem: HTMLInputElement, regex: RegExp): void {
    if (validate(regex, inputElem)) {
      this.view.showValidMessage(inputElem);
    } else {
      this.view.showNotValidMessage(inputElem);
    }
  }

  private checkName(inputElem: HTMLInputElement): void {
    const value = inputElem.value;
    const fio = value.trim().split(' ');
    if (fio.length < 2) {
      this.view.showNotValidMessage(inputElem);
    } else {
      const fName = fio[0];
      const lName = fio[1];
      if (fName.length < 3 || lName.length < 3) {
        this.view.showNotValidMessage(inputElem);
      } else {
        this.view.showValidMessage(inputElem);
      }
    }
  }

  private checkAddress(inputElem: HTMLInputElement): void {
    const value = inputElem.value;
    const address = value.split(' ');
    const isInvalid = address
      .map((item) => {
        if (item.length < 5 || address.length < 3) {
          return 'invalid';
        }
        return 'valid';
      })
      .some((item) => item === 'invalid');

    isInvalid ? this.view.showNotValidMessage(inputElem) : this.view.showValidMessage(inputElem);
  }

  private checkDate(): void {
    // const dateInp = this.view.dateInt;
    // const dateInpErr = this.view.dateIntErr;
    // if (dateInp && dateInpErr) {
    //   const day = Number(dateInp.value.slice(0, 2));
    //   const month = Number(dateInp.value.slice(3));
    //   if (!validate(cardDate, dateInp) || month > 12 || month < 0 || day > 31) {
    //     notValid(dateInp, dateInpErr, 'Enter valid card date');
    //   } else {
    //     isValid(dateInp, dateInpErr);
    //   }
    // }
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
}

export default CartModalController;
