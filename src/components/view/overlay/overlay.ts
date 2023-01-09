class Overlay {
  private overlayElem: HTMLDivElement;

  public constructor() {
    const overlayElem = document.createElement('div');
    overlayElem.className = 'overlay';

    this.overlayElem = overlayElem;
  }

  public get overlay(): HTMLDivElement {
    return this.overlayElem;
  }

  public showOverlay(): HTMLDivElement {
    document.body.append(this.overlayElem);
    return this.overlayElem;
  }

  public hideOverlay(): void {
    this.overlayElem.remove();
  }
}

export default Overlay;
