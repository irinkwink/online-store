import MainView from '../../view/templatePage/mainView';

class MainController {
  public view: MainView;

  constructor() {
    this.view = new MainView();
  }

  public init() {
    this.view.draw();
  }
}

export default MainController;
