import MainView from '../../view/templatePage/mainView';

class MainController {
  public view: MainView;

  constructor() {
    this.view = new MainView();
  }

  public init() {
    this.view.draw();
  }

  public emptyMain() {
    this.view.emptyMain();
  }
}

export default MainController;
