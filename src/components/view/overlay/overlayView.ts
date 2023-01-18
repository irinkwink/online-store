class OverlayView {
  private overlayElem: HTMLDivElement | null;

  public constructor() {
    this.overlayElem = null;
  }

  public get overlay(): HTMLDivElement | null {
    return this.overlayElem;
  }

  public drawOverlay(): HTMLDivElement {
    this.overlayElem = document.createElement('div');
    this.overlayElem.className = 'overlay';

    document.body.append(this.overlayElem);
    return this.overlayElem;
  }

  public hideOverlay(): void {
    this.overlayElem?.remove();
    this.overlayElem = null;
  }
}

export default OverlayView;
