export class ModalView {
  form: HTMLFormElement | null;
  fioInp: HTMLInputElement | null;
  fioErr: HTMLElement | null;
  phoneInp: HTMLInputElement | null;
  phoneErr: HTMLElement | null;
  addressInp: HTMLInputElement | null;
  addressErr: HTMLElement | null;
  cardNumInp: HTMLInputElement | null;
  cardNumInpErr: HTMLElement | null;
  ccvInp: HTMLInputElement | null;
  ccvInpErr: HTMLElement | null;
  dateInt: HTMLInputElement | null;
  dateIntErr: HTMLElement | null;
  mailInp: HTMLInputElement | null;
  mailInpErr: HTMLElement | null;

  constructor() {
    this.form = null;
    this.fioInp = null;
    this.fioErr = null;
    this.phoneInp = null;
    this.phoneErr = null;
    this.addressInp = null;
    this.addressErr = null;
    this.cardNumInp = null;
    this.cardNumInpErr = null;
    this.ccvInp = null;
    this.ccvInpErr = null;
    this.dateInt = null;
    this.dateIntErr = null;
    this.mailInp = null;
    this.mailInpErr = null;
  }

  drawModal() {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      const modal = document.createElement('div');
      const modalBackdrop = document.createElement('div');
      modalBackdrop.className = 'modal__backdrop';
      const modalWrapper = document.createElement('div');
      modalWrapper.className = 'modal__wrapper';
      const modalComponent = document.createElement('div');
      modalComponent.className = 'modal__component';
      const formBlock = document.createElement('form');
      formBlock.className = 'modal__form';
      formBlock.id = 'form';
      formBlock.method = 'post';
      this.form = formBlock;
      modal.className = 'modal';
      const modalTitle = document.createElement('h2');
      modalTitle.textContent = 'Personal details';
      const inputWr = document.createElement('div');
      inputWr.className = 'modal__input-wr';
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'input';
      nameInput.placeholder = 'Enter name';
      this.fioInp = nameInput;
      const nameInputErr = document.createElement('span');
      nameInputErr.className = 'err';
      this.fioErr = nameInputErr;
      const phoneInput = document.createElement('input');
      phoneInput.type = 'tel';
      phoneInput.className = 'input';
      phoneInput.placeholder = 'Enter phone';
      this.phoneInp = phoneInput;
      const phoneInputErr = document.createElement('span');
      phoneInputErr.className = 'err';
      this.phoneErr = phoneInputErr;
      const addressInput = document.createElement('input');
      addressInput.type = 'text';
      addressInput.placeholder = 'Enter address';
      addressInput.className = 'input';
      this.addressInp = addressInput;
      const addressInputErr = document.createElement('span');
      addressInputErr.className = 'err';
      this.addressErr = addressInputErr;
      const mailInput = document.createElement('input');
      mailInput.type = 'email';
      mailInput.className = 'input';
      mailInput.placeholder = 'Enter e-mail';
      this.mailInp = mailInput;
      const mailErr = document.createElement('span');
      mailErr.className = 'err';
      this.mailInpErr = mailErr;
      inputWr.append(
        nameInput,
        nameInputErr,
        phoneInput,
        phoneInputErr,
        addressInput,
        addressInputErr,
        mailInput,
        mailErr
      );
      const subtitle = document.createElement('h2');
      const creditCardWr = document.createElement('div');
      creditCardWr.className = 'modal__credit-wr';
      subtitle.textContent = 'Credit card details';
      subtitle.className = 'modal__subtitle';
      const cardNumberInput = document.createElement('input');
      cardNumberInput.type = 'number';
      cardNumberInput.className = 'input';
      cardNumberInput.placeholder = 'Card number';
      this.cardNumInp = cardNumberInput;
      const cardNumErr = document.createElement('span');
      cardNumErr.className = 'err';
      this.cardNumInpErr = cardNumErr;
      const cardValidInput = document.createElement('input');
      cardValidInput.type = 'text';
      cardValidInput.className = 'input thru';
      cardValidInput.placeholder = 'Card thru';
      this.dateInt = cardValidInput;
      const dateErr = document.createElement('span');
      dateErr.className = 'err';
      this.dateIntErr = dateErr;
      const cardCodeInput = document.createElement('input');
      cardCodeInput.type = 'number';
      cardCodeInput.placeholder = 'Code';
      cardCodeInput.className = 'input';
      this.ccvInp = cardCodeInput;
      const ccvdNumErr = document.createElement('span');
      ccvdNumErr.className = 'err';
      this.ccvInpErr = ccvdNumErr;
      const btnWr = document.createElement('div');
      btnWr.className = 'modal__btn';
      const submit = document.createElement('button');
      submit.textContent = 'submit';
      submit.className = 'btn submit-btn';
      btnWr.append(submit);
      creditCardWr.append(cardNumberInput, cardNumErr, cardValidInput, dateErr, cardCodeInput, ccvdNumErr);
      formBlock.append(modalTitle, inputWr, subtitle, creditCardWr, btnWr);
      modalComponent.append(formBlock);
      modalWrapper.append(modalComponent);
      modal.append(modalBackdrop, modalWrapper);
      main.append(modal);
    }
  }
}

export default ModalView;
