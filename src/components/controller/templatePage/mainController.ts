import MainView from '../../view/templatePage/mainView';

class MainController {
  public view: MainView;

  constructor() {
    this.view = new MainView();
  }

  public init(): void {
    this.view.draw();
  }

  public emptyMain(): void {
    this.view.emptyMain();
  }
}

export default MainController;
