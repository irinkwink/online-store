class MainView {
  private mainElem: HTMLElement | null;

  constructor() {
    this.mainElem = null;
  }

  public get main() {
    return this.mainElem;
  }

  public draw() {
    this.mainElem = document.createElement('main');
    this.mainElem.className = 'main';
  }
}

export default MainView;
