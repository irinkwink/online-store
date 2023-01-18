import { MESSAGES } from '../../app/const';

class Page404View {
  private wrapperElem: HTMLElement | null;

  public constructor() {
    this.wrapperElem = null;
  }

  public set wrapper(elem: HTMLElement | null) {
    this.wrapperElem = elem;
  }

  public draw(): void {
    if (this.wrapperElem) {
      this.wrapperElem.innerHTML = '';
      const containerElem = document.createElement('div');
      containerElem.className = 'container';

      containerElem.append(this.createMessageElem());
      this.wrapperElem.append(containerElem);
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
