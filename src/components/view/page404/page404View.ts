import { MESSAGES } from '../../app/const';

class Page404View {
  private wrapperElem: HTMLElement | null;

  public constructor() {
    this.wrapperElem = null;
  }

  public set wrapper(elem: HTMLElement | null) {
    this.wrapperElem = elem;
  }

  public draw() {
    if (this.wrapperElem) {
      this.wrapperElem.innerHTML = '';
      this.wrapperElem.append(this.createMessageElem());
    }
  }

  private createMessageElem(): HTMLDivElement {
    const messageElem = document.createElement('div');
    messageElem.className = 'message';

    const textElems = MESSAGES.page404.map((text) => {
      const textElem = document.createElement('p');
      textElem.className = `message__text`;
      textElem.textContent = text;

      return textElem;
    });

    messageElem.append(...textElems);
    return messageElem;
  }
}

export default Page404View;
