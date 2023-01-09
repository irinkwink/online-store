class Overlay {
  private overlayElem: HTMLDivElement;

  constructor() {
    const overlayElem = document.createElement('div');
    overlayElem.className = 'overlay';

    this.overlayElem = overlayElem;
  }

  public get overlay(): HTMLDivElement {
    return this.overlayElem;
  }

  showOverlay(): HTMLDivElement {
    document.body.append(this.overlayElem);
    return this.overlayElem;
  }

  hideOverlay(): void {
    this.overlayElem.remove();
  }
}

export default Overlay;
