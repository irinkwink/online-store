class MainView {
  private mainElem: HTMLElement | null;

  constructor() {
    this.mainElem = null;
  }

  public get main(): HTMLElement | null {
    return this.mainElem;
  }

  public draw(): void {
    this.mainElem = document.createElement('main');
    this.mainElem.className = 'main';
  }

  public emptyMain(): void {
    if (this.mainElem) {
      this.mainElem.innerHTML = '';
    }
  }
}

export default MainView;
