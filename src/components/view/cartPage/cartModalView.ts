import { OrderFormInput } from '../../../types/types';
import { CARD_DETAILS, FORM_LINK, MESSAGES, PERSON_DETAILS } from '../../app/const';
import { FormInputs } from '../../../types/enums';

export class CartModalView {
  private main: HTMLElement | null;
  private contentElem: HTMLDivElement | null;
  private formElem: HTMLFormElement | null;
  private nameInputElem: HTMLInputElement | null;
  private phoneInputElem: HTMLInputElement | null;
  private emailInputElem: HTMLInputElement | null;
  private addressInputElem: HTMLInputElement | null;
  private cardNumberInputElem: HTMLInputElement | null;
  private dateInputElem: HTMLInputElement | null;
  private cvvCodeInputElem: HTMLInputElement | null;
  private cardTitleElem: HTMLLegendElement | null;

  constructor() {
    this.main = null;
    this.contentElem = null;
    this.formElem = null;
    this.phoneInputElem = null;
    this.emailInputElem = null;
    this.nameInputElem = null;
    this.addressInputElem = null;
    this.cardNumberInputElem = null;
    this.dateInputElem = null;
    this.cardTitleElem = null;
    this.cvvCodeInputElem = null;
  }

  public set setMain(elem: HTMLElement | null) {
    this.main = elem;
  }

  public get form() {
    return this.formElem;
  }

  public get nameInput() {
    return this.nameInputElem;
  }

  public get phoneInput() {
    return this.phoneInputElem;
  }

  public get emailInput() {
    return this.emailInputElem;
  }

  public get addressInput() {
    return this.addressInputElem;
  }

  public get cardNumberInput() {
    return this.cardNumberInputElem;
  }

  public get dateInput() {
    return this.dateInputElem;
  }

  public get cvvCodeInput() {
    return this.cvvCodeInputElem;
  }

  public draw(overlayElem: HTMLDivElement | null): void {
    if (this.main && overlayElem) {
      const modalElem = document.createElement('div');
      modalElem.className = 'modal';

      const contentElem = document.createElement('div');
      contentElem.className = 'modal__content';

      const formElem = document.createElement('form');
      formElem.className = 'modal__form form';
      formElem.id = 'form';
      formElem.method = 'post';

      const personFieldElem = document.createElement('fieldset');
      personFieldElem.className = 'form__field form__field_person';

      const personTitleElem = document.createElement('legend');
      personTitleElem.className = 'form__title form__title_person';
      personTitleElem.textContent = 'Personal details';

      const personInputElems = PERSON_DETAILS.map((item) => this.createInputElem(item));

      const cardFieldElem = document.createElement('fieldset');
      cardFieldElem.className = 'form__field form__field_card';

      const cardTitleElem = document.createElement('legend');
      cardTitleElem.className = 'form__subtitle';
      cardTitleElem.textContent = 'Credit card';

      const cardInputElems = CARD_DETAILS.map((item) => this.createInputElem(item));

      const submitBtnElem = document.createElement('button');
      submitBtnElem.className = 'btn form__submit';
      submitBtnElem.textContent = 'Order';

      const closeBtnElem = document.createElement('button');
      closeBtnElem.className = 'btn modal__close';

      closeBtnElem.innerHTML = `
        <svg width="32" height="32" viewbox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.3337 8.54667L23.4537 6.66667L16.0003 14.12L8.54699 6.66667L6.66699 8.54667L14.1203 16L6.66699 23.4533L8.54699 25.3333L16.0003 17.88L23.4537 25.3333L25.3337 23.4533L17.8803 16L25.3337 8.54667Z" />
        </svg>
      `;

      personFieldElem.append(personTitleElem, ...personInputElems);
      cardFieldElem.append(cardTitleElem, ...cardInputElems);
      formElem.append(personFieldElem, cardFieldElem, submitBtnElem);
      contentElem.append(formElem);
      modalElem.append(contentElem, closeBtnElem);

      overlayElem.append(modalElem);
      this.main.append(overlayElem);

      this.contentElem = contentElem;
      this.formElem = formElem;
      this.cardTitleElem = cardTitleElem;
    }
  }

  private createInputElem(item: OrderFormInput): HTMLDivElement {
    const inputWrapperElem = document.createElement('div');
    inputWrapperElem.className = `form__input-wrapper form__input-wrapper_${item.id}`;

    const inputElem = document.createElement('input');
    inputElem.className = `form__input form__input_${item.id} input`;
    inputElem.id = item.id;
    inputElem.name = item.id;
    inputElem.type = item.type;
    inputElem.placeholder = item.placeholder;

    const hintElem = document.createElement('div');
    hintElem.className = 'form__hint';

    const errorElem = document.createElement('output');
    errorElem.className = `form__label form__label_error`;
    errorElem.id = `${item.id}Valid`;
    errorElem.name = `${item.id}Label`;

    const labelElem = document.createElement('label');
    labelElem.className = `form__label form__label_hint`;
    labelElem.id = `${item.id}Label`;
    labelElem.textContent = item.label;
    labelElem.htmlFor = item.id;

    if (item.id === FormInputs.name) this.nameInputElem = inputElem;
    if (item.id === FormInputs.phone) this.phoneInputElem = inputElem;
    if (item.id === FormInputs.email) this.emailInputElem = inputElem;
    if (item.id === FormInputs.address) this.addressInputElem = inputElem;
    if (item.id === FormInputs.validDate) this.dateInputElem = inputElem;
    if (item.id === FormInputs.cardNumber) this.cardNumberInputElem = inputElem;
    if (item.id === FormInputs.cvvCode) this.cvvCodeInputElem = inputElem;

    hintElem.append(errorElem, labelElem);
    inputWrapperElem.append(inputElem, hintElem);

    return inputWrapperElem;
  }

  public drawMessage(name = '') {
    if (this.contentElem) {
      this.contentElem.innerHTML = '';
      this.contentElem?.append(this.createMessageElem(name));
    }
  }

  private createMessageElem(name = ''): HTMLDivElement {
    const messageElem = document.createElement('div');
    messageElem.className = 'message';

    const messages = [...MESSAGES.orderSuccess];

    if (name) {
      messages[0] = `${name}, ${messages[0].toLowerCase()}`;
    }

    const textElems = messages.map((text, index) => {
      const footnoteClass = index === messages.length - 1 ? 'message__text_footnote' : '';
      const textElem = document.createElement('p');
      textElem.className = `message__text message__text_small ${footnoteClass}`;
      textElem.textContent = text;

      if (text.includes('form')) {
        const linkElem = document.createElement('a');
        linkElem.className = 'message__link';
        linkElem.href = FORM_LINK;
        linkElem.target = '_blank';
        linkElem.append(textElem);

        return linkElem;
      }

      return textElem;
    });

    messageElem.append(...textElems);
    return messageElem;
  }

  public updateCardImage(cardType: string) {
    if (this.cardTitleElem) {
      this.cardTitleElem.className = `form__subtitle form__subtitle_${cardType}`;
    }
  }

  public showNotValidMessage(inputElem: HTMLInputElement) {
    inputElem.classList.add('form__input_invalid');
    inputElem.classList.remove('form__input_valid');
    if (this.formElem) {
      const name = `${inputElem.name}Valid`;
      this.formElem[name].textContent = 'Error:';
    }
  }

  public showValidMessage(inputElem: HTMLInputElement) {
    inputElem.classList.remove('form__input_invalid');
    inputElem.classList.add('form__input_valid');
    if (this.formElem) {
      const name = `${inputElem.name}Valid`;
      this.formElem[name].textContent = 'Valid:';
    }
  }
}

export default CartModalView;
