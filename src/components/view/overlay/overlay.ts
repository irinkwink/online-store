class Overlay {
  private overlayElem: HTMLDivElement;

  constructor() {
    const overlayElem = document.createElement('div');
    overlayElem.className = 'overlay';

    this.overlayElem = overlayElem;
  }

  public get overlay() {
    return this.overlayElem;
  }

  showOverlay() {
    document.body.append(this.overlayElem);
    return this.overlayElem;
  }

  hideOverlay() {
    this.overlayElem.remove();
  }
}

export default Overlay;
