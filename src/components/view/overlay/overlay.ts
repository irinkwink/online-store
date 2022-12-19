class Overlay {
  overlay: HTMLDivElement;

  constructor() {
    const overlayElem = document.createElement('div');
    overlayElem.className = 'overlay';

    this.overlay = overlayElem;
  }

  showOverlay() {
    document.body.append(this.overlay);
    return this.overlay;
  }

  hideOverlay() {
    this.overlay.remove();
  }
}

export default Overlay;
